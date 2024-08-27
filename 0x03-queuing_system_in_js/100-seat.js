import { createClient } from 'redis';
import { promisify } from 'util';
import express from 'express';
import kue from 'kue';

const app = express();
const port = 1245;

const client = createClient();
client.on('error', (err) => console.error(`Redis client not connected to the server: ${err}`));

client.on('connect', () => {
	console.log('Redis client connected to the server');
	reserveSeat(50); // Initialize with 50 seats
});

const reserveSeat = (number) => {
	client.set('available_seats', number);
};

const getCurrentAvailableSeats = async () => {
	const getAsync = promisify(client.get).bind(client);
	return await getAsync('available_seats');
};

// Initialize reservationEnabled to true
let reservationEnabled = true;

// set up Kue Queue
const queue = kue.createQueue();

// Route to get available seats
app.get('/available_seats', async (req, res) => {
	const numberOfAvailableSeats = await getCurrentAvailableSeats();
	res.json({ numberOfAvailableSeats });
});

// Route to reserve a seat
app.get('/reserve_seat', async (req, res) => {
	if (!reservationEnabled) {
		return res.json({ status: 'Reservation are blocked' });
	}

	const job = queue.create('reserve_seat').save((err) => {
		if (!err) {
			res.json({ status: 'Reservation in process' });
		} else {
			res.json({ status: 'Reservation failed' });
		}
	});

	job.on('complete', () => {
		console.log(`Seat reservation job ${job.id} completed`);
	});

	job.on('failed', (err) => {
		console.log(`Seat reservation job ${job.id} failed: ${err}`);
	});
});

// Route to process the queue
app.get('/process', async (req, res) => {
	res.json({ status: 'Queue processing' });

	queue.process('reserve_seat', async (job, done) => {
		const currentSeats = await getCurrentAvailableSeats();
		const availableSeats = parseInt(currentSeats, 10);

		if (availableSeats <= 0) {
			reservationEnabled = false;
			return done(new Error('Not enough seats available'));
		}

		reserveSeat(availableSeats - 1);

		if (availableSeats - 1 === 0) {
			reservationEnabled = false;
		}

		done();
	});
});

// start the server
app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});

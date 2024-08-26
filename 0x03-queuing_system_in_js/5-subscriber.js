import { createClient } from 'redis';

// Create a Redis client
const client = createClient();

// handle successful connection
client.on('connect', () => {
	console.log('Redis client connected to the server');
});

// handle connection error
client.on('error', (err) => {
	console.log(`Redis client not connected to the server: ${err.message}`);
});

// subscribe to the channell
client.subscribe('holberton school channel');

// Handle message reception
client.on('message', (channel, message) => {
	console.log(message);
	if (message === 'KILL_SERVER') {
		console.log('Received KILL_SERVER message, unsubscribing and quitting...');
		client.unsubscribe();
		client.quit();
	}
});

import { createClient } from 'redis';
import redis from 'redis';

// create a redis client
const client = createClient();

// Handle successful connection
client.on('connect', () => {
	console.log('Redis client connected to the server');
});

// handle conenction error
client.on('error', (err) => {
	console.log(`Redis client not connected to the server: ${err.message}`);
});

// function to set hash values
function createHash() {
	client.hset('HolbertonSchools', 'Portland', '50', redis.print);
	client.hset('HolbertonSchools', 'Seattle', '80', redis.print);
	client.hset('HolbertonSchools', 'New York', '20', redis.print);
	client.hset('HolbertonSchools', 'Bogota', '20', redis.print);
	client.hset('HolbertonSchools', 'Cali', '40', redis.print);
	client.hset('HolbertonSchools', 'Paris', '2', redis.print);
}

// Function to display the hash values
function displayHash() {
	client.hgetall('HolbertonSchools', (err, obj) => {
		if (err) {
			console.error(`Error retrieving hash: ${err.message}`);
		} else {
			console.log(obj);
		}
	});
}

// execute the functions
createHash();
displayHash();

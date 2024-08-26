import { createClient } from 'redis';

// create a Redis client
const client = createClient();

// Handle successful connection
client.on('connect', () => {
	console.log('Redis client connected to the server');
});

// Hnadle connection error
client.on('error', (err) => {
	console.log(`Redis client not connected to the server: ${err.message}`);
});

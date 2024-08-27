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

// function to set a new school value in redis
function setNewSchool(schoolName, value) {
	client.set(schoolName, value, (err, reply) => {
		if (err) {
			console.error(`Error setting value for ${schoolName}: ${err.message}`);
		} else {
			console.log(`Reply: ${reply}`);
		}
	});
}

// function to display value of a school from redis
function displaySchoolValue(schoolName) {
	client.get(schoolName, (err, reply) => {
		if (err) {
			console.error(`Error retrieving value for ${schoolName}: ${err.message}`);
		} else {
			console.log(reply);
		}
	});
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');

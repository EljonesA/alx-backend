import { createClient } from 'redis';
import { promisify } from 'util';


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

// promisify Redis methods
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

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

// function to display value of a school from redis using async/wait
async function displaySchoolValue(schoolName) {
	try {
		const value = await getAsync(schoolName);
		console.log(value);
	} catch (err) {
		console.error(`Error retrieving value for ${schoolName}: ${err.message}`);
	}
}

async function main() {
	await displaySchoolValue('Holberton');
	await setNewSchool('HolbertonSanFrancisco', '100');
	await displaySchoolValue('HolbertonSanFrancisco');
}

main()

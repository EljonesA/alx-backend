import kue from 'kue';

// Create a Kue queue
const queue = kue.createQueue();

// Function to send a notification
function sendNotification(phoneNumber, message) {
	console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Define the job processing logic
queue.process('push_notification_code', (job, done) => {
	// extract job data
	const { phoneNumber, message } = job.data;

	// cal sendNotification with job data
	sendNotification(phoneNumber, message);

	// Indicate that the job is done
	done();
});

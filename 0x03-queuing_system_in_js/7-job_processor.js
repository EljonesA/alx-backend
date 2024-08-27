import kue from 'kue';

// Create a queue
const queue = kue.createQueue();

// Array of blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

// Function to send notifications
function sendNotification(phoneNumber, message, job, done) {
	// Track job progress to 0%
	job.progress(0, 100);

	// Check if the phone number is blacklisted
	if (blacklistedNumbers.includes(phoneNumber)) {
		// Fail the job if the phone number is blacklisted
		return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
	}

	// Track job progress to 50%
	job.progress(50, 100);

	console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

	// mark the job as done
	done();
}

// Process jobs from the queue `push_notification_code_2` with two concurrent jobs at a time
queue.process('push_notification_code_2', 2, (job, done) => {
	const { phoneNumber, message } = job.data;
	sendNotification(phoneNumber, message, job, done);
});

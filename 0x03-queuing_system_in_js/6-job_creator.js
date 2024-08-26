import kue from 'kue';

// Create a Kue queue
const queue = kue.createQueue();

// Define job data
const jobData = {
	phoneNumber: '123-456-7890',
	message: 'This is the code to verify your account'
};

// Create a job in the 'push_notification_code' queue
const job = queue.create('push_notification_code', jobData)
	.save((err) => {
		if (err) {
			console.error(`Error creating job: ${err.message}`);
		} else {
			console.log(`Notification job created: ${job.id}`);
		}
	});

// handle job completion
job.on('complete', () => {
	console.log('Notification job completed');
});

// Handle job failure
job.on('failed', (errorMessage) => {
	console.log(`Notification job failed: ${errorMessage}`);
});

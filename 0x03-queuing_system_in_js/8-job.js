function createPushNotificationsJobs(jobs, queue) {
	// Check if jobs is an array
	if (!Array.isArray(jobs)) {
		throw new Error('Jobs is not an array');
	}

	// Iterate over each job in the jobs array
	jobs.forEach((jobData) => {
		// Create a new job in the queue push_notification_code_3
		const job = queue.create('push_notification_code_3', jobData);

		// log when the job is created
		job.save((err) => {
			if (!err) {
				console.log(`Notification job created: ${job.id}`);
			}
		});

		// handle job completion
		job.on('complete', () => {
			console.log(`Notification job ${job.id} completed`);
		});

		// Handle job progress
		job.on('progress', (progress) => {
			console.log(`Notification job ${job.id} ${progress}% complete`);
		});
	});
}

export default createPushNotificationsJobs;

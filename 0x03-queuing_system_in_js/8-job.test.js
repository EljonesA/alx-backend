import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
	let queue;

	beforeEach(() => {
		// Create a new Kue queue and enter test mode
		queue = kue.createQueue();
		if (queue && queue.testMode) {
			queue.testMode.enter();
		} else {
			throw new Error('Failed to enter test mode');
		}
	});

	afterEach(() => {
		// Clear the queue and exit test mode
		if (queue && queue.testMode) {
			queue.testMode.clear();
			queue.testMode.exit();
		} else {
			throw new Error('Failed to exit test mode');
		}
	});

	it('should display an error message if jobs is not an array', () => {
		expect(() => createPushNotificationsJobs('not an array', queue)).to.throw(
			'Jobs is not an array'
		);
	});

	it('should create two new jobs to the queue', () => {
		const jobs = [
			{
				phoneNumber: '4153518780',
				message: 'This is the code 1234 to verify your account',
			},
			{
				phoneNumber: '4153518781',
				message: 'This is the code 4562 to verify your account',
			},
		];

		createPushNotificationsJobs(jobs, queue);

		// check that two jobs have been created
		expect(queue.testMode.jobs.length).to.equal(2);

		//  check details of the first job
		expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
		expect(queue.testMode.jobs[0].data).to.eql(jobs[0]);

		// check details of second job
		expect(queue.testMode.jobs[1].type).to.equal('push_notification_code_3');
		expect(queue.testMode.jobs[1].data).to.eql(jobs[1]);
	});
});

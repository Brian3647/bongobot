import { Event } from '../core/types';

export default {
	id: 'ready',
	run: () => {
		console.log('Bot on-line!');
	}
} as Event<'ready'>;

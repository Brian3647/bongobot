import { Command } from 'types';

export default {
	name: 'ping',
	alias: ['p'],
	run: (client, message) => {
		const latency = [
			Date.now() - message.createdTimestamp,
			Math.round(client.ws.ping)
		];

		message.reply(
			`Bot latency: ${latency[0]}ms\nAPI Latency: ${latency[1]}ms`
		);
	}
} as Command;

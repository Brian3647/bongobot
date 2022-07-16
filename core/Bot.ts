import { Command, Event } from './types';
import { Client } from 'discord.js';

import fs from 'fs/promises';
import path from 'path';

export default class Bot {
	eventsPath: string = path.join(__dirname, '..', 'events');
	commandsPath: string = path.join(__dirname, '..', 'commands');
	commands: Command[] = [];
	events: Event[] = [];
	prefix = 'bc!';
	clientID = '715087504520511541';

	constructor(private client: Client) {
		client.login(process.env.BOT_TOKEN);
	}

	async start() {
		await this.loadCommands();
		await this.loadEvents();
		await this.handleCommands();
	}

	async loadCommands() {
		const files = await fs.readdir(this.commandsPath);
		files
			.filter((x) => x.endsWith('.ts'))
			.forEach(async (x) => {
				const module = await import(path.join(this.commandsPath, x));
				this.commands.push(module.default);
			});
	}

	async loadEvents() {
		const files = await fs.readdir(this.eventsPath);
		files
			.filter((x) => x.endsWith('.ts'))
			.forEach(async (x) => {
				const module = await import(path.join(this.eventsPath, x));
				const event: Event = module.default;
				this.events.push(event);
				this.client.on(event.id, (...args) =>
					event.run(this.client, ...args)
				);
			});
	}

	async handleCommands() {
		this.client.on('messageCreate', (message) => {
			const raw = message.content;
			if (!raw.startsWith(this.prefix)) return;
			if (
				!message.guild?.members.cache
					.get(this.clientID)
					?.permissions.has('SEND_MESSAGES')
			)
				return;

			const args = raw
				.trim()
				.slice(this.prefix.length)
				.toLowerCase()
				.split(/\s/);

			if (args.length === 0) return;
			const cmd = args.shift() || '';
			this.commands.forEach((x) => {
				if (x.name === cmd || x.alias?.includes(cmd))
					x.run(this.client, message);
			});
		});
	}
}

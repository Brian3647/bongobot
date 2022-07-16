import { Client, ClientEvents, Message } from 'discord.js';

interface Command {
	name: string;
	alias?: string[];
	run: (client: Client, message: Message) => void;
}

interface Event<T extends keyof ClientEvents = keyof ClientEvents> {
	id: T;
	run: (client: Client, ...args: ClientEvents[T]) => void;
}

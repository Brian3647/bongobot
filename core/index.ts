import dotenv from 'dotenv';
import Bot from './Bot';
import { Client, IntentsString } from 'discord.js';

dotenv.config();

const intents: IntentsString[] = ['GUILDS', 'GUILD_MESSAGES'];
const client = new Client({ intents });
const bot = new Bot(client);
bot.start();

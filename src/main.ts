import 'dotenv/config';
import 'reflect-metadata';

import { dirname, importx } from '@discordx/importer';
import { IntentsBitField } from 'discord.js';
import { Client, DIService, tsyringeDependencyRegistryEngine } from 'discordx';
import { container } from 'tsyringe';

class Main {
	private static client: Client;

	static get Client(): Client {
		return Main.client;
	}

	static async start() {
		DIService.engine = tsyringeDependencyRegistryEngine.setInjector(container);

		Main.client = new Client({
			intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.MessageContent],
			botGuilds: [process.env.GUILD_ID],
		});

		await importx(`${dirname(import.meta.url)}/{commands,events}/**/*.ts`);

		await Main.client.login(process.env.BOT_TOKEN);
	}
}

void Main.start();

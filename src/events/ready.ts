import { Events } from 'discord.js';
import { Client, Discord, Once } from 'discordx';
import { injectable } from 'tsyringe';
import { Database } from '../services/index.js';

@Discord()
@injectable()
class Ready {
	constructor(private database: Database) {
		// I am an empty constructor and I am here to make sure that the Database service is loaded
	}

	@Once({
		event: Events.ClientReady,
	})
	async readyHandler([client]: [Client]): Promise<void> {
		console.log(`Logged in as ${client.user?.tag}`);
		console.log(`Database: ${this.database.query()}`);
	}
}

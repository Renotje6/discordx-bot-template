import { singleton } from 'tsyringe';

@singleton()
export class Database {
	database: string;

	constructor() {
		this.database = 'MySQL';
	}

	query() {
		return this.database;
	}
}

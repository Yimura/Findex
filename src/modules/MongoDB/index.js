import { ModuleBuilder } from 'waffle-manager';
import mongoose from 'mongoose';

const name = 'mongodb';

export const ModuleInfo = new ModuleBuilder(name);

export const ModuleInstance = class {

    constructor(main) {
        this.name = name;
        this.config = main.config.mongo;
        this.permissions = main.config.permissions;
        this.log = main.log;
    }

    //required for Modules.load() using waffle manager
    async init() {
        this.log.info(name.toUpperCase(), `Starting ${name}...`);

        try {
            await mongoose.connect(
                `mongodb://${this.config.user}:${this.config.password}@${this.config.host}:${this.config.port}/${this.config.database}?authSource=${this.config.authSource}`,
                this.config.options);
        } catch (err) {
            this.log.critical(this.name.toUpperCase(), 'Could not establish connection to MongoDB server:', err);

            return false;
        }

        if (this.config.development) {
            mongoose.set('debug', (collectionName, method, query, doc) => {
                this.log.verbose(this.name.toUpperCase(), `${collectionName}.${method} ${JSON.stringify(query)}`, doc);
            });
        }


        this.log.info(this.name.toUpperCase(), 'Connected to MongoDB server!');

        return true;
    }

    //required for Modules.cleanup() using waffle manager
    async cleanup() {}

}
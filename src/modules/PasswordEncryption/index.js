import { ModuleBuilder } from 'waffle-manager';
import crypto from 'crypto';


const name = 'password';

export const ModuleInfo = new ModuleBuilder(name);

export const ModuleInstance = class {

    constructor(main) {
        this.name = name;
        this.config = main.config.password;
        this.log = main.log;

    }

    randomPassword(length = 16) {
        // Declare all characters
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        // Pick characers randomly
        let str = '';
        for (let i = 0; i < length; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return str;
    }

    encrypt(password) {
        const hash = crypto.pbkdf2Sync(password, this.config.salt, 1000, 64, `sha512`).toString('hex');
        return hash;
    }

    valid(password, hash) {
        var compareHash = this.encrypt(password);
        return compareHash === hash;
    }

    //required for Modules.load() using waffle manager
    async init() {
        this.log.info(name.toUpperCase(), `Starting ${name}...`);



        return true;
    }

    //required for Modules.cleanup() using waffle manager
    async cleanup() {}

}
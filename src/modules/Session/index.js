import { ModuleBuilder } from 'waffle-manager';
import crypto from 'crypto';


const name = 'session';

export const ModuleInfo = new ModuleBuilder(name);

export const ModuleInstance = class {

    constructor(main) {
        this.name = name;
        this.config = main.config.session;
        this.log = main.log;
        this.sessions = new Map();
    }


    async create(user) {
        let sessionId, session = {};

        do {
            sessionId = crypto.randomBytes(16).toString('base64');
        } while (this.sessions.has(sessionId));

        Object.assign(session, user);
        session.now = Date.now();
        session.id = sessionId;

        this.sessions.set(sessionId, session);
        return sessionId;
    }

    getSession(sessionId) {
        return this.sessions.get(sessionId);
    }

    valid(sessionId) {

        const session = this.getSession(sessionId);

        if (session && (Date.now() - session.now) < this.config.ttl  * 1000) {
            return true;
        } else {
            return false;
        }
    }

    //required for Modules.load() using waffle manager
    async init() {
        this.log.info(this.name.toUpperCase(), 'Session manager started!');
        
        
        return true;
    }



    //required for Modules.cleanup() using waffle manager
    async cleanup() {}

}
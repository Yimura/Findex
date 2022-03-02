import Data from '../util/Data.js';

import User from './user.js'

export default class API {

    constructor(app) {

        this.app = app;

        this.host = `http://${this.app.hostname}/api/v1`;

        Object.assign(this, Data);

        this.User = new User(this);

        
    }

}
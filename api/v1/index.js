import Modules from 'waffle-manager';

export default class Index extends Modules.rest.classes.Route {
    constructor() {
        super();
    }

    get route() {
        return '';
    }

    /**
     * 
     * @param {HTTPRequest} request 
     */
    get(request) {
        return request.accept('Yey, you reached the index of API.');
    }
}
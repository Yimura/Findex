import Modules from 'waffle-manager';

export default class Valid {
    constructor(main) {
        //super(main);
    }

    /**
     * Leave empty to use the directory name as the route, modify to add on top of the directory structure
     * /api/index.js with and empty route will map to /api/
     * If modified this will add on top of the current directory of the file, /api/index.js with get route() => 'index' will map to /api/index
     * NOTE: leading slash is required if the route is not empty
     * @returns {string}
     */
    get route() {
        // return '/index';

        return '/valid';
    }

    /**
     *
     * @param {Modules.web.Request} request
     * @returns {boolean}
     */
    async get(request) {
        if (!request.headers.authorization) return request.reject(403);
        if (!Modules.session.valid(request.headers.authorization)) return request.reject(403);


        return request.accept();
    }
}
import Modules from 'waffle-manager';

export default class Login {
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

        return '/login';
    }

    /**
     *
     * @param {Modules.web.Request} request
     * @returns {boolean}
     */
    async post(request) {
        const body = await request.json();

        if (body && body.username && body.password) {
            const user = (await Modules.users.getUser({username: body.username}, true));
            if (user) {
                if (Modules.password.valid(body.password, user.password)) {
                    return request.accept({
                        sessionId: await Modules.session.create(user)
                    });
                } else {
                    return request.reject(400);
                }
            } else {
                return request.reject(404);
            }


        } else {
            return request.reject(400);
        }

    }
}
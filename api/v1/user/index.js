import Modules from 'waffle-manager';

export default class User {
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

        return '';
    }

    /**
     *
     * @param {Modules.web.Request} request
     * @returns {boolean}
     */
    async delete(request) {
        if (!request.headers.authorization) return request.reject(403);
        if (!Modules.session.valid(request.headers.authorization)) return request.reject(403);

        const body = await request.json();
        if (!body) return request.reject(400);

        return request.accept('', 201);
    }

    /**
     *
     * @param {Modules.web.Request} request
     * @returns {boolean}
     */
    async get(request) {
        
        if (!request.headers.authorization) return request.reject(403);
        if (!Modules.session.valid(request.headers.authorization)) return request.reject(403);

        const body = await request.json();

        if (body) {
            let user = await Modules.users.getUser(body);

            if (user) {
                return request.accept(user);
            } else {
                return request.reject(404);
            }
        }


    }

    /**
     *
     * @param {Modules.web.Request} request
     * @returns {boolean}
     */
    async post(request) {
        // if (!request.headers.authorization) return request.reject(403);
        // if (!Modules.session.valid(request.headers.authorization)) return request.reject(403);

        const body = await request.json();

        if (body) {
            let user = await Modules.users.getUser({username: body.username});
            if (user) {
                return request.reject(409, null, "The user already exists. Try something else!");
            }
            user = await Modules.users.createUser(body);

            if (!user) {
                return request.reject(400);
            }

            return request.accept(user, 201);


        } else {
            return request.reject(400);
        }
    }

    async put(request) {
        if (!request.headers.authorization) return request.reject(403);
        if (!Modules.session.valid(request.headers.authorization)) return request.reject(403);

        console.log(request.headers.authorization, Modules.session.valid(request.headers.authorization));

        const body = await request.json();
        if( body ) {
            let user = await Modules.users.updateUser( body.query, body.update);
            
            if (user) {
                user = await Modules.users.getUser({username: user.username});
                return request.accept(user);
            } else {
                return request.reject(404);
            }
        } else {
            return request.reject(400);
        }
    }

}
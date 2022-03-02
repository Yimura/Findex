
export default class User {

    constructor(api) {
        this.api = api;
    }

    get base() {
        /*
            Hier zet je de api endpoint (this.api.host + "/whatever/endpoint/je/wilt")
        */
        return this.api.host;
    }

    async login(user) {
        let url = this.api.host + `/auth/login`;
        if (user.username && user.password) {
            const res = await this.api.post(url, user);

            if (res.ok) {
                return (await res.json());
            }

            return (await res.json());
        } else {
            return "Enter username and password";
        }
        
    }

    async valid(id) {
        let url = this.api.host + `/auth/valid`;
        if (id) {
            const res = await this.api.get(url, {}, {Authorization: id});
            if (res.ok) {
                return true;
            }

            return false;
        } else {
            return "Enter sessionID";
        }
        
    }

    async getById(id) {

        let url = this.base + `/${id}`;
        console.log(url);

        // this.api.get komt uit de ./js/util/Data.js file
        const res = await this.api.get(url);


        // Als de request ok returned returnen we de data als een object.
        if (res.ok) {
            return (await res.json());
        }

        // Alles hier is al het een error is.
        const errorBody = await res.json();

        // En deze error returnen
        return `${res.status} - ${errorBody.status}`;
    }

    async post(body) {
        // Handle post
    }

    async put(body) {
        // Handle put
    }

}
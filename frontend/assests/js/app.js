import API from './API/index.js';
import FormFunctions from './formfunctions/index.js';

export default class App {


    constructor() {
        this.hostname = "localhost:8080";
        
        this.api = new API(this);
        this.ff = new FormFunctions(this);
        this.init();
    }


    async init() {

        if (!sessionStorage.getItem('sessionId')) {
            if (window.location.pathname != '/login.html') {
                window.location = '/login.html';
                return;
            }
        }
        
        if (window.location.pathname == '/' && sessionStorage.getItem('sessionId')) {
            let valid = await this.api.User.valid(sessionStorage.getItem('sessionId'));
            if (!valid) {
                window.location = '/login.html';
                return;
            }
        }

        if (window.location.pathname == '/login.html' && sessionStorage.getItem('sessionId')) {
            let valid = await this.api.User.valid(sessionStorage.getItem('sessionId'));
            if (valid) {
                window.location = '/';
                return;
            }
        }


        

    }

    async login() {
        if (window.location.pathname == '/login.html') {
            const username = document.querySelector('input[name="username"]').value;
            const password = document.querySelector('input[name="password"]').value;

            const res = await this.api.User.login({username, password});
            if (res.sessionId) {
                sessionStorage.setItem('sessionId', res.sessionId);
                window.location = '/';
            }
        }
    }

    async logout() {

        // logout endpoint
        //const res = await this.api.User.login({username, password});
        if (sessionStorage.getItem('sessionId')) {
            sessionStorage.removeItem('sessionId');
        }
        window.location = '/login.html';
    }

    async load() {
        console.log('load function called!');
    }


    domReady(e) {
        this.body = document.body;
    }
    
}
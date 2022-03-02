import API from './API/index.js';
import FormFunctions from './formfunctions/index.js';

export default class App {


    constructor() {
        this.hostname = "localhost:81";
        
        this.api = new API(this);
        this.ff = new FormFunctions(this);
        this.p = '/app/'
        this.init();
    }


    async init() {
        
        const valid = await this.api.User.valid(sessionStorage.getItem('sessionId'));
        if (window.location.pathname == this.p + 'index.html') {
            if (!valid) {
                console.log('SessionId is not good, goto the login');
                window.location = this.p + 'login.html';
            } else {
                this.load();
            }
        } else if (window.location.pathname == this.p + 'login.html') {
            if (valid) {
                console.log('SessionId is already good, goto the index')
                window.location = this.p + 'index.html';
                this.load();
            }
        };
    }

    async login() {
        if (window.location.pathname == this.p + 'login.html') {
            const username = document.querySelector('input[name="username"]').value;
            const password = document.querySelector('input[name="password"]').value;

            const res = await this.api.User.login({username, password});
            if (res.sessionId) {
                sessionStorage.setItem('sessionId', res.sessionId);
                window.location = this.p + 'login.html';
            }
        }
    }

    async load() {
        const projects = await this.api.Project.getMultiple({name: "TestProject"});
        this.ff.project.fillProjects(projects);
    }


    domReady(e) {
        this.body = document.body;
    }
    
}
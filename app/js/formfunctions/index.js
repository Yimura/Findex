import Project from "./project.js";


export default class FormFunctions {
    constructor(app) {
        this.app = app;
        this.project = new Project(this);
    }
}
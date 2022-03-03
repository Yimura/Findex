import { ModuleBuilder } from 'waffle-manager';

import UserModel from './models/UserModel.js'

const name = 'users';

export const ModuleInfo = new ModuleBuilder(name).addRequired('mongodb');

export const ModuleInstance = class {

    constructor(main) {
        this.name = name;
        this.config = main.config.mongo;
        this.permissions = main.config.permissions;
        this.log = main.log;
    }

    createUser(user) {
        return UserModel.createUser(user);
    }

    deleteUser(user) {
        return UserModel.deleteUser(user);
    }

    getUser(q, password = false) {
        return UserModel.getUser(q, password);
    }

    getById(id) {
        return UserModel.getById(id);
    }

    getUsers(q, password = false) {
        return UserModel.getUsers(q, password);
    }

    updateUser(user, update) {
        return UserModel.updateUser(user, update);
    }

    init() {

        return true;
    }

    cleanup() { }


}
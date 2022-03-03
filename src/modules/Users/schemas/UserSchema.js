import { PermissionLevel, PermissionLevels } from '../util/Constants.js';
import Modules from 'waffle-manager';
import mongoose from 'mongoose';

const user = new mongoose.Schema({
    username: { type: String, unique: true, required: 'Username is required'},
    password: { type: String, unique: true, required: 'Password is required'},
    email: { 
        type: String, 
        required: 'Email address is required'
    },
    permission: { type: String, enum: PermissionLevels, default: PermissionLevel.NORMAL },
});

user.pre('save', function() {
    if (this.password)
        this.password = Modules.password.encrypt(this.password);
});

user.pre('findOneAndUpdate', function() {
    if (this._update.password)
        this._update.password = Modules.password.encrypt(this._update.password);
});


export default {
    UserSchema: user,
    UserModel: mongoose.model('Users', user)
};
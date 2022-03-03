import User from '../schemas/UserSchema.js';
const UserModel = User.UserModel;

/**
 * 
 * @param {Object} user 
 * @returns {UserModel}
 */
export const createUser = (user) => {
    return new UserModel(user).save();
};

/**
 * @param {Object} user 
 * @returns {UserModel}
 */
export const deleteUser = (user) => {
    return UserModel.findOneAndDelete(user).exec();
};

/**
 * Find a user based on a user object
 * @param {Object} q 
 * @param {Boolean} getPassword 
 * @returns {UserModel}
 */
export const getUser = (q, getPassword = false) => {
    return UserModel
        .findOne(q, '-__v')
        .select(getPassword ? {} : { password: 0 })
        .exec();
};

export const getById = (id) => {
    return UserModel.findById(id, '-__v').exec();
}

/**
 * 
 * @param {Object} q query
 * @param {Boolean} getPassword 
 * @returns {Array<UserModel>}
 */
export const getUsers = (q, getPassword = false) => {
    return UserModel
        .find(q, '-__v')
        .select(getPassword ? {} : { password: 0 })
        .exec();
};

export const updateUser = (q, update) => {
    return UserModel.findOneAndUpdate(q, update, { new: true }).exec();
};


export default {
    createUser,
    deleteUser,
    getUser,
    getById,
    getUsers,
    updateUser
};
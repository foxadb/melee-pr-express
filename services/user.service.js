const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.getUsers = async function () {
    try {
        var users = await User.find().select({ username: 1, role: 1});
        return users;
    } catch (e) {
        throw Error('Error while paginating users');
    }
};

exports.registerUser = async function (user) {
    try {
        // Creating a new user with the hashed password
        var newUser = new User({
            username: user.username,
            password: user.password,
            role: user.role
        });

        // Hashing the user password
        await newUser.hashPassword();

        var savedUser = await newUser.save();
        return savedUser;
    } catch (e) {
        throw Error("Error while register user");
    }
};

exports.loginUser = async function (user) {
    try {
        // Finding the user
        var loggedUser = await User.findOne({ username: user.username });

        if (loggedUser) {
            // Testing password matching
            var res = await loggedUser.comparePassword(user.password);
            return res ? loggedUser : undefined;
        } else {
            return undefined;
        }
    } catch (e) {
        throw Error("Error while sign in user");
    }
};

exports.updateUser = async function (user) {
    try {
        // Find the old User Object by the Id
        var oldUser = await User.findById(user._id);
    } catch (e) {
        throw Error("Error occured while finding the user");
    }

    // If no old User Object exists return false
    if (!oldUser) {
        return false;
    }

    // Edit the User Object
    oldUser.username = user.username != null ? user.username : oldUser.username;
    oldUser.role = user.role != null ? user.role : oldUser.role;

    if (user.password) {
        oldUser.password = user.password;
        await oldUser.hashPassword();
    }

    try {
        var savedUser = await oldUser.save();
        return savedUser;
    } catch (e) {
        throw Error("Error occured while updating the tournament");
    }
}

exports.deleteUser = async function (id) {
    try {
        var deleted = await User.remove({ _id: id });
        if (deleted.result.n === 0) {
            throw Error("User could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while deleting the user");
    }
};
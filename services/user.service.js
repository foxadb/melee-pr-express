const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.getUsers = async function () {
    try {
        var users = await User.find().select({ username: 1});
        return users;
    } catch (e) {
        throw Error('Error while paginating users');
    }
};

exports.register = async function (user) {
    try {
        // Generating salt
        var salt = await bcrypt.genSalt(10);
        // Hashing the user password
        var hash = await bcrypt.hash(user.password, salt);

        // Creating a new user with the hashed password
        var newUser = new User({
            username: user.username,
            password: hash,
            role: user.role
        });

        var savedUser = await newUser.save();
        return savedUser;
    } catch (e) {
        throw Error("Error while register user");
    }
};

exports.login = async function (user) {
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
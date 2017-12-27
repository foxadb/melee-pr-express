const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.getUsers = async function (query, page, limit) {
    var options = {
        page,
        limit
    };

    try {
        var users = await User.paginate(query, options);
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
            password: hash
        });

        var savedUser = await newUser.save();
        return savedUser;
    } catch (e) {
        throw Error("Error while creating user");
    }
};
const UserService = require('../services/user.service');
const config = require('config');
const jwt = require('jsonwebtoken');

exports.getUsers = async function (req, res, next) {
    try {
        var users = await UserService.getUsers();
        return res.status(200).json({ status: 200, data: users, message: "Successfully users received" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.register = async function (req, res, next) {
    var user = {
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    };

    try {
        var createdUser = await UserService.register(user);
        return res.status(201).json({ status: 201, data: createdUser, message: "Successfully created user" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "User creation was unsuccessfull" });
    }
};

exports.signIn = async function (req, res, next) {
    var user = {
        username: req.body.username,
        password: req.body.password
    };

    try {
        var signedInUser = await UserService.signIn(user);

        if (!signedInUser) {
            return res.status(401).json({ status: 401, message: "Authentication failed. Wrond username or password" });
        } else {
            // JSON Web Token
            var token = await jwt.sign(
                { _id: signedInUser._id, username: signedInUser.username, role: signedInUser.role },
                config.get('jwtsecret'), // private key
                { expiresIn: 3600 } // 1 hour
            );
            return res.status(200).json({ status: 200, token: token, message: "Authentication successfull"});
        }
    } catch (e) {
        throw Error("Error while sign in");
    }
};

exports.userOnly = async function (req, res, next) {
    if (req.user && (req.user.role == 'user' || req.user.role == 'admin')) {
        next();
    } else {
        return res.status(401).json({ status: 401, message: "Unauthorized user" });
    }
};

exports.adminOnly = async function (req, res, next) {
    if (req.user && (req.user.role == 'admin')) {
        next();
    } else {
        return res.status(401).json({ status: 401, message: "Unauthorized user" });
    }
};
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

exports.registerUser = async function (req, res, next) {
    var user = {
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    };

    try {
        var createdUser = await UserService.registerUser(user);
        return res.status(201).json({ status: 201, data: createdUser, message: "Successfully created user" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "User creation was unsuccessfull" });
    }
};

exports.loginUser = async function (req, res, next) {
    var user = {
        username: req.body.username,
        password: req.body.password
    };

    try {
        var loggedUser = await UserService.loginUser(user);

        if (!loggedUser) {
            return res.status(401).json({ status: 401, message: "Authentication failed. Wrond username or password" });
        } else {
            // JSON Web Token
            var token = await jwt.sign(
                { _id: loggedUser._id, username: loggedUser.username, role: loggedUser.role },
                config.get('jwtsecret'), // private key
                { expiresIn: 3600 } // 1 hour
            );
            return res.status(200).json({ status: 200, token: token, message: "Authentication successfull"});
        }
    } catch (e) {
        throw Error("Error while sign in");
    }
};

exports.updateUser = async function (req, res, next) {
    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({ status: 400., message: "Id must be present" });
    }

    var id = req.body._id;

    var user = {
        id,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    };

    try {
        var updatedUser = await UserService.updateUser(user);
        return res.status(200).json({ status: 200, data: updatedTournament, message: "Successfully updated tournament" });
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message });
    }
};

exports.deleteUser = async function (req, res, next) {
    // User ID
    var userId = req.params.id;

    try {
        var deleted = await UserService.deleteUser(userId);
        return res.status(204).json({ status: 204, message: "Successfully match deleted" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.managerOnly = async function (req, res, next) {
    if (req.user && (req.user.role == 'manager' || req.user.role == 'admin')) {
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
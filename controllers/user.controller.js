const UserService = require("../services/user.service");

exports.getUsers = async function (req, res, next) {
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10;

    try {
        var users = await UserService.getUsers({}, page, limit);
        return res.status(200).json({ status: 200, data: users, message: "Succesfully users received" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.register = async function (req, res, next) {
    var user = {
        username: req.body.username,
        password: req.body.password
    };

    try {
        var createdUser = await UserService.register(user);
        return res.status(201).json({ status: 201, data: createdUser, message: "Succesfully created user" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "User creation was unsuccesfull" });
    }
};
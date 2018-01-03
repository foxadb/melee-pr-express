// Create a default admin user

const UserService = require('../services/user.service');

var admin = {
    username: "admin",
    password: "password",
    role: "admin"
};

UserService.registerUser(admin);
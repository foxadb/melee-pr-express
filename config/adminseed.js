const UserService = require('../services/user.service');

var admin = {
    username: 'admin',
    password: 'password',
    role: 'admin'
};

// Create a default admin user
UserService.registerUser(admin).then(
    user => console.log("Default admin created:\n",
        admin,
        '\nYou should create a new admin account ASAP and delete the default one'
    ),
    error => console.log('Default admin credentials:\n',
        admin)
);
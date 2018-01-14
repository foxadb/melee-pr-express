const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const UserService = require('../../services/user.service');

const bluebird = require('bluebird');
const mongoose = require('mongoose');
mongoose.Promise = bluebird;

describe('UserService', function () {

    before('database connection', function (done) {
        mongoose.connect('mongodb://localhost/melee-pr-test', { useMongoClient: true }).then(
            () => {
                done();
            },
            err => {
                console.error('Connection error');
            }
        );
    });

    describe('#registerUser', function () {

        it('should register a user', function (done) {
            let user = {
                username: 'arte',
                password: 'ILoveArduino',
                role: 'admin'
            };

            UserService.registerUser(user)
                .then(user => {
                    expect(user.username).to.eql('arte');
                    expect(user.password).to.not.eql('ILoveArduino');
                    expect(user.role).to.eql('admin');
                    done();
                })
                .catch(error => console.error(error))

        });

    });

    describe('#loginUser', function () {

        before('create a user', async function () {
            await UserService.registerUser({
                username: 'camus',
                password: 'mystrongpassword',
                role: 'manager'
            });
        })

        it('should log successfully', async function () {
            let user = {
                username: 'camus',
                password: 'mystrongpassword'
            };

            let loggedUser = await UserService.loginUser(user);
            expect(loggedUser.username).to.eql('camus');
            expect(loggedUser.role).to.eql('manager');
        });

        it('should fail login', async function () {
            let user = {
                username: 'camus',
                password: 'wrongpassword'
            };

            let loggedUser = await UserService.loginUser(user);
            expect(loggedUser).to.be.undefined;
        });

    });


    describe('#updateUser', function () {

        it('should update the user', async function () {
            let user = await UserService.registerUser({
                username: 'luigi',
                password: 'dairnair',
                role: 'manager'
            });

            let updatedUser = await UserService.updateUser({
                _id: user.id,
                username: 'marth',
                role: 'admin'
            });

            expect(updatedUser.username).to.eql('marth');
            expect(updatedUser.role).to.eql('admin');
        });

    });

    describe('#deleteUser', function () {

        it('should delete the user', async function () {
            let user = await UserService.registerUser({
                username: 'bobi',
                password: 'awesomepassword',
                role: 'manager'
            });

            let deleted = await UserService.deleteUser(user._id);
            expect(deleted.result.n).to.eql(1);
        });

    });

    describe('#getUsers', function () {

        before('create 2 users', async function () {
            // Drop the current database
            await mongoose.connection.db.dropDatabase();

            await UserService.registerUser({
                username: 'john',
                password: 'papa',
                role: 'admin'
            });
            await UserService.registerUser({
                username: 'cigey',
                password: 'thebigpassword',
                role: 'manager'
            });
        })

        it('should return the user list', function () {
            UserService.getUsers()
                .then(users => expect(users).to.have.length(2))
                .catch(error => console.error(error));
        });

    });

    after('databse drop', function (done) {
        mongoose.connection.db.dropDatabase(done);
    });

});
// Create a default admin user
const UserService = require('../../services/user.service');

const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;

const app = require('../../app');  

before(done => app.on("appStarted", done));

describe('Test beginning', function () {

    it('should register a default admin', function (done) {
        let admin = {
            username: 'admin',
            password: 'password',
            role: 'admin'
        };

        UserService.registerUser(admin)
            .then(user => {
                expect(user.username).to.eql('admin');
                expect(user.password).to.not.eql('password');
                expect(user.role).to.eql('admin');
                done();
            })
            .catch(error => {
                console.error(error);
                done();
            })
    });

});
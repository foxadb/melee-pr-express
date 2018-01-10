const mocha = require('mocha');
const request = require('supertest');
const app = require('../app');

const chai = require('chai');
const expect = chai.expect;

const userRoute = '/api/user';

describe('User API', function () {

    var token;

    it('Login', function (done) {
        let body = {
            username: 'admin',
            password: 'password'
        }
        
        request(app)
            .post(`${userRoute}/login`)
            .send(body)
            .expect('Content-Type', /json/)
            .expect(function(res) {
                token = 'Bearer ' + res.body.token;
            })
            .expect(200, done);
    });

    it('Get Users', function (done) {
        request(app)
            .get(userRoute)
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
    
    var userId;
    
    it('Register', function (done) {
        let body = {
            username: 'newuser',
            password: 'password',
            role: 'manager'
        };

        request(app)
            .post(`${userRoute}/register`)
            .set('Authorization', token)
            .send(body)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                userId = res.body.data._id;
            })
            .expect(201, done);
    });
    
    it('Update', function (done) {
        let body = {
            _id: userId,
            username: 'newuser',
            password: 'newpassword',
            role: 'admin'
        };

        request(app)
            .put(userRoute)
            .set('Authorization', token)
            .send(body)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('Delete', function (done) {
        request(app)
            .delete(`${userRoute}/${userId}`)
            .set('Authorization', token)
            .expect(204, done);
    });

});
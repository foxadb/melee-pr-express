const mocha = require('mocha');
const request = require('supertest');
const app = require('../app');

const chai = require('chai');
const expect = chai.expect;

const userRoute = '/api/user';

describe('User API', function () {

    var token;

    it('Login Success', function (done) {
        let body = {
            username: 'admin',
            password: 'password'
        }

        request(app)
            .post(`${userRoute}/login`)
            .send(body)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                token = 'Bearer ' + res.body.token;
            })
            .expect(200, done);
    });

    it('Login Fail', function (done) {
        let body = {
            username: 'admin',
            password: 'wrongpassword'
        }

        request(app)
            .post(`${userRoute}/login`)
            .send(body)
            .expect('Content-Type', /json/)
            .expect(401, done);
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

    it('Register w/o Auth: should fail', function (done) {
        let body = {
            username: 'nouser',
            password: 'nopassword',
            role: 'manager'
        };

        request(app)
            .post(`${userRoute}/register`)
            .send(body)
            .expect('Content-Type', /json/)
            .expect(401, done);
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

    it('Update w/o Auth: should fail', function (done) {
        let body = {
            _id: userId,
            role: 'manager'
        };

        request(app)
            .put(userRoute)
            .send(body)
            .expect('Content-Type', /json/)
            .expect(401, done);
    });

    it('Delete', function (done) {
        request(app)
            .delete(`${userRoute}/${userId}`)
            .set('Authorization', token)
            .expect(204, done);
    });

    it('Delete w/o Auth: should fail', function (done) {
        request(app)
            .delete(`${userRoute}/${userId}`)
            .expect(401, done);
    });

});
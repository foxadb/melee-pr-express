const mocha = require('mocha');
const request = require('supertest');
const app = require('../../app');

const chai = require('chai');
const expect = chai.expect;

const userRoute = '/api/user';
const playerRoute = '/api/player';

describe('Player API', function () {

    var token;

    it('AUTHENTICATION', function (done) {
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

    it('GET', function (done) {
        request(app)
            .get(playerRoute)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
    
    var playerId;
    
    it('POST', function (done) {
        let body = {
            name: 'Test Player',
            mains: ['fox', 'falco'],
            location: 'Paris',
            score: 2500
        };

        request(app)
            .post(playerRoute)
            .set('Authorization', token)
            .send(body)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                playerId = res.body.data._id;
            })
            .expect(201, done);
    });
    
    it('PUT', function (done) {
        let body = {
            _id: playerId,
            name: 'Updated Test Player',
            location: 'Lyon'
        };

        request(app)
            .put(playerRoute)
            .set('Authorization', token)
            .send(body)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('GET/:id', function (done) {
        request(app)
            .get(`${playerRoute}/${playerId}`)
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
    
    it('DELETE', function (done) {
        request(app)
            .delete(`${playerRoute}/${playerId}`)
            .set('Authorization', token)
            .expect(204, done);
    });

});
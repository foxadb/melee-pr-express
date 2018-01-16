const app = require('../../app');

const mocha = require('mocha');
const request = require('supertest');

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

    it('POST w/o Auth: should fail', function (done) {
        let body = {
            name: 'Test Player',
            mains: ['fox', 'falco'],
            location: 'Paris',
            score: 2500
        };

        request(app)
            .post(playerRoute)
            .send(body)
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
    
    it('POST w Auth', function (done) {
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

    it('PUT w/o Auth: should fail', function (done) {
        let body = {
            _id: playerId,
            name: 'Updated Test Player',
            location: 'Lyon'
        };

        request(app)
            .put(playerRoute)
            .send(body)
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
    
    it('PUT w Auth', function (done) {
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

    it('GET/:unknown_id: should fail', function (done) {
        request(app)
            .get(`${playerRoute}/314159265359`)
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(404, done);
    });

    it('GET/:id w/o Auth', function (done) {
        request(app)
            .get(`${playerRoute}/${playerId}`)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('GET/:id w Auth', function (done) {
        request(app)
            .get(`${playerRoute}/${playerId}`)
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('DELETE unknown player: should fail', function (done) {
        request(app)
            .delete(`${playerRoute}/314159265359`)
            .set('Authorization', token)
            .expect(403, done);
    });
    
    it('DELETE w/o Auth: should fail', function (done) {
        request(app)
            .delete(`${playerRoute}/${playerId}`)
            .expect(401, done);
    });

    it('DELETE w Auth', function (done) {
        request(app)
            .delete(`${playerRoute}/${playerId}`)
            .set('Authorization', token)
            .expect(204, done);
    });

});
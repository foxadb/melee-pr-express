const app = require('../../app');

const mocha = require('mocha');
const request = require('supertest');

const chai = require('chai');
const expect = chai.expect;

const userRoute = '/api/user';
const tournamentRoute = '/api/tournament';

describe('Tournament API', function () {

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

    it('GET w Auth', function (done) {
        request(app)
            .get(tournamentRoute)
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('GET w/o Auth', function (done) {
        request(app)
            .get(tournamentRoute)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
    
    var tournamentId;

    it('POST w/o Auth: should fail', function (done) {
        let body = {
            name: 'Test Tournament',
            organiser: 'Test Organiser',
            location: 'Lyon'
        };

        request(app)
            .post(tournamentRoute)
            .send(body)
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
    
    it('POST', function (done) {
        let body = {
            name: 'Test Tournament',
            organiser: 'Test Organiser',
            location: 'Lyon'
        };

        request(app)
            .post(tournamentRoute)
            .set('Authorization', token)
            .send(body)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                tournamentId = res.body.data._id;
            })
            .expect(201, done);
    });

    it('PUT w/o Auth: should fail', function (done) {
        let body = {
            _id: tournamentId,
            name: 'Updated Test Tournament',
            location: 'Montpellier'
        };

        request(app)
            .put(tournamentRoute)
            .send(body)
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
    
    it('PUT', function (done) {
        let body = {
            _id: tournamentId,
            name: 'Updated Test Tournament',
            location: 'Montpellier'
        };

        request(app)
            .put(tournamentRoute)
            .set('Authorization', token)
            .send(body)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('GET/:id', function (done) {
        request(app)
            .get(`${tournamentRoute}/${tournamentId}`)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('GET/:unknown_id: should fail', function (done) {
        request(app)
            .get(`${tournamentRoute}/314159265359`)
            .expect('Content-Type', /json/)
            .expect(404, done);
    });

    it('DELETE an unknown tournament: should fail', function (done) {
        request(app)
            .delete(`${tournamentRoute}/314159265359`)
            .set('Authorization', token)
            .expect(403, done);
    });

    it('DELETE w/o Auth: should fail', function (done) {
        request(app)
            .delete(`${tournamentRoute}/${tournamentId}`)
            .expect(401, done);
    });
    
    it('DELETE', function (done) {
        request(app)
            .delete(`${tournamentRoute}/${tournamentId}`)
            .set('Authorization', token)
            .expect(204, done);
    });

});
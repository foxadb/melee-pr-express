const mocha = require('mocha');
const request = require('supertest');
const app = require('../app');

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

    it('GET', function (done) {
        request(app)
            .get(tournamentRoute)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
    
    var tournamentId;
    
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
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
    
    it('DELETE', function (done) {
        request(app)
            .delete(`${tournamentRoute}/${tournamentId}`)
            .set('Authorization', token)
            .expect(204, done);
    });

});
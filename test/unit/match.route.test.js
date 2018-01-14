const mocha = require('mocha');
const request = require('supertest');
const app = require('../../app');

const chai = require('chai');
const expect = chai.expect;

const userRoute = '/api/user';
const matchRoute = '/api/match';
const tournamentRoute = '/api/tournament';
const playerRoute = '/api/player';

describe('Match API', function () {

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
            .expect(function (res) {
                token = 'Bearer ' + res.body.token;
            })
            .expect(200, done);
    });

    var tournamentId;
    var player1Id;
    var player2Id;

    it('Create a Tournament and 2 Players', function (done) {
        let tournament = { name: 'Test Tournament' };
        let player1 = { name: 'Test Player 1' };
        let player2 = { name: 'Test Player 2' };

        request(app)
            .post(tournamentRoute)
            .set('Authorization', token)
            .send(tournament)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                tournamentId = res.body.data._id;
            })
            .expect(201)
            .then(

            request(app)
                .post(playerRoute)
                .set('Authorization', token)
                .send(player1)
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    player1Id = res.body.data._id;
                })
                .expect(201)
                .then(

                request(app)
                    .post(playerRoute)
                    .set('Authorization', token)
                    .send(player2)
                    .expect('Content-Type', /json/)
                    .expect(function (res) {
                        player2Id = res.body.data._id;
                    })
                    .expect(201, done)
                )
            );
    });

    it('GET', function (done) {
        request(app)
            .get(matchRoute)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    var matchId;

    it('POST', function (done) {
        let body = {
            player1: player1Id,
            player2: player2Id,
            score1: 3,
            score2: 1,
            tournament: tournamentId
        };

        request(app)
            .post(matchRoute)
            .set('Authorization', token)
            .send(body)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                matchId = res.body.data._id;
            })
            .expect(201, done);
    });

    it('PUT', function (done) {
        let body = {
            _id: matchId,
            score2: 0
        };

        request(app)
            .put(matchRoute)
            .set('Authorization', token)
            .send(body)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('GET/:id', function (done) {
        request(app)
            .get(`${matchRoute}/${matchId}`)
            .set('Authorization', token)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('DELETE', function (done) {
        request(app)
            .delete(`${matchRoute}/${matchId}`)
            .set('Authorization', token)
            .expect(204, done);
    });

    it('Delete the temp tournament and players', function (done) {
        request(app)
            .delete(`${tournamentRoute}/${tournamentId}`)
            .set('Authorization', token)
            .expect(204)
            .then(

            request(app)
                .delete(`${playerRoute}/${player1Id}`)
                .set('Authorization', token)
                .expect(204)
                .then(

                request(app)
                    .delete(`${playerRoute}/${player2Id}`)
                    .set('Authorization', token)
                    .expect(204, done)
                )
            );
    });

});
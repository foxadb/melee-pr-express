var MatchService = require('../services/match.service');
var PlayerService = require('../services/player.service');
var TournamentService = require('../services/tournament.service');

exports.getMatches = async function (req, res, next) {
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 100;

    try {
        var matches = await MatchService.getMatches({}, page, limit);
        return res.status(200).json({ status: 200, data: matches, message: "Succesfully matches received" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getMatch = async function (req, res, next) {
    // Match ID
    var id = req.params.id;

    try {
        var player = await MatchService.getMatch(id);
        return res.status(200).json({ status: 200, data: player, message: "Successfully match received" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.createMatch = async function (req, res, next) {
    var match = {
        player1: req.body.player1,
        player2: req.body.player2,
        score1: req.body.score1,
        score2: req.body.score2,
        tournament: req.body.tournament
    };

    try {
        var createdMatch = await MatchService.createMatch(match);

        // Add the new match to the players matches list
        PlayerService.addMatch(createdMatch.player1, createdMatch);
        PlayerService.addMatch(createdMatch.player2, createdMatch);

        // Add the new match to its tournament
        if (match.tournament) {
            TournamentService.addMatch(createdMatch.tournament, createdMatch);
        }

        return res.status(201).json({ status: 201, data: createdMatch, message: "Succesfully created match" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Match creation was unsuccesfull" });
    }
};

exports.updateMatch = async function (req, res, next) {
    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({ status: 400., message: "Id must be present" });
    }

    var id = req.body._id;

    var match = {
        id,
        player1: req.body.player1 ? req.body.player1 : null,
        player2: req.body.player2 ? req.body.player2 : null,
        score1: req.body.score ? req.body.score1 : null,
        score2: req.body.score ? req.body.score2 : null,
        tournament: req.body.score ? req.body.tournament : null
    };

    try {
        var updatedMatch = await MatchService.updateMatch(match);
        return res.status(200).json({ status: 200, data: updatedMatch, message: "Succesfully updated match" });
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message });
    }
};

exports.removeMatch = async function (req, res, next) {
    // Match ID
    var matchId = req.params.id;

    try {
        var match = await MatchService.getMatch(matchId);

        // Remove the match from player matches list
        PlayerService.removeMatch(match.player1, matchId);
        PlayerService.removeMatch(match.player2, matchId);

        // Remove the match from its tournament
        if (match.tournament) {
            TournamentService.removeMatch(match.tournament, matchId);
        }

        var deleted = await MatchService.deleteMatch(matchId);
        return res.status(204).json({ status: 204, message: "Succesfully match deleted" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

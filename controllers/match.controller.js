const MatchService = require('../services/match.service');
const PlayerService = require('../services/player.service');
const TournamentService = require('../services/tournament.service');

exports.getMatches = async function (req, res, next) {
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var page = req.query.page ? +req.query.page : 1;
    var limit = req.query.limit ? +req.query.limit : 30;

    if (limit > 50) {
        return res.status(403).json({ status: 403, message: "Limit can not be higher than 50" });
    }

    try {
        var matches = await MatchService.getMatches({}, page, limit);
        return res.status(200).json({ status: 200, data: matches, message: "Successfully matches received" });
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
        return res.status(404).json({ status: 404, message: e.message });
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
        PlayerService.addMatch(createdMatch.player1, createdMatch._id);
        PlayerService.addMatch(createdMatch.player2, createdMatch._id);

        // Add the new match to its tournament
        TournamentService.addMatch(createdMatch.tournament, createdMatch._id);

        // Return success result
        return res.status(201).json({ status: 201, data: createdMatch, message: "Successfully created match" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.updateMatch = async function (req, res, next) {
    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({ status: 400, message: "Id must be present" });
    }

    var id = req.body._id;

    var match = {
        id,
        score1: req.body.score1,
        score2: req.body.score2
    };

    try {
        // Update the match
        var updatedMatch = await MatchService.updateMatch(match);
        
        // Return success result
        return res.status(200).json({ status: 200, data: updatedMatch, message: "Successfully updated match" });
    } catch (e) {
        return res.status(403).json({ status: 403, message: e.message });
    }
};

exports.deleteMatch = async function (req, res, next) {
    // Match ID
    var matchId = req.params.id;

    try {
        var match = await MatchService.getMatch(matchId);

        if (match) {
            // Remove the match from player matches list
            PlayerService.removeMatch(match.player1._id, matchId);
            PlayerService.removeMatch(match.player2._id, matchId);

            // Remove the match from its tournament
            if (match.tournament) {
                TournamentService.removeMatch(match.tournament._id, matchId);
            }
        } else {
            throw Error("Match does not exist");
        }

        // Delete the match
        var deleted = await MatchService.deleteMatch(matchId);
        return res.status(204).json({ status: 204, message: "Successfully match deleted" });
    } catch (e) {
        return res.status(403).json({ status: 403, message: e.message });
    }
};
const TournamentService = require('../services/tournament.service');
const PlayerService = require('../services/player.service');
const MatchService = require('../services/match.service');

exports.getTournaments = async function (req, res, next) {
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var page = req.query.page ? +req.query.page : 1;
    var limit = req.query.limit ? +req.query.limit : 30;

    if (limit > 50) {
        return res.status(403).json({ status: 403, message: 'Limit can not be higher than 50' });
    }

    try {
        var tournaments = await TournamentService.getTournaments({}, page, limit);
        return res.status(200).json({ status: 200, data: tournaments, message: 'Successfully tournaments received' });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getTournament = async function (req, res, next) {
    // Tournament ID
    var id = req.params.id;

    try {
        var tournament = await TournamentService.getTournament(id);
        return res.status(200).json({ status: 200, data: tournament, message: 'Successfully tournament received' });
    } catch (e) {
        return res.status(404).json({ status: 404, message: e.message });
    }
};

exports.createTournament = async function (req, res, next) {
    var tournament = {
        name: req.body.name,
        location: req.body.location,
        organiser: req.body.organiser,
        date: req.body.date,
        matches: req.body.matches
    };

    try {
        var createdTournament = await TournamentService.createTournament(tournament);
        return res.status(201).json({ status: 201, data: createdTournament, message: 'Successfully created tournament' });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.updateTournament = async function (req, res, next) {
    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({ status: 400, message: 'Id must be present' });
    }

    var id = req.body._id;

    var tournament = {
        id,
        name: req.body.name,
        location: req.body.location,
        organiser: req.body.organiser,
        date: req.body.date
    };

    try {
        var updatedTournament = await TournamentService.updateTournament(tournament);
        return res.status(200).json({ status: 200, data: updatedTournament, message: 'Successfully updated tournament' });
    } catch (e) {
        return res.status(403).json({ status: 403, message: e.message });
    }
};

exports.deleteTournament = async function (req, res, next) {
    // Tournament ID
    var tournamentId = req.params.id;

    try {
        var tournament = await TournamentService.getTournament(tournamentId);
        var matches = tournament.matches;

        // Delete all tournament matches
        if (matches) {
            for (let i = 0; i < matches.length; ++i) {
                const matchId = matches[i];
                const match = await MatchService.getMatch(matchId);

                // Remove the match from player matches list
                await PlayerService.removeMatch(match.player1._id, matchId);
                await PlayerService.removeMatch(match.player2._id, matchId);

                // Delete the match
                MatchService.deleteMatch(matchId);
            }
        }

        var deleted = await TournamentService.deleteTournament(tournamentId);
        return res.status(204).json({ status: 204, message: 'Successfully tournament deleted' });
    } catch (e) {
        return res.status(403).json({ status: 403, message: e.message });
    }
};
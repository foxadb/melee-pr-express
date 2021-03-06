const PlayerService = require('../services/player.service');
const MatchService = require('../services/match.service');
const TournamentService = require('../services/tournament.service');

exports.getPlayers = async function (req, res, next) {
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var page = req.query.page ? +req.query.page : 1;
    var limit = req.query.limit ? +req.query.limit : 30;
    var ranking = (req.query.ranking == 'true');

    if (limit > 50) {
        return res.status(403).json({ status: 403, message: 'Limit can not be higher than 50' });
    }

    try {
        var players = await PlayerService.getPlayers({}, page, limit, ranking);
        return res.status(200).json({ status: 200, data: players, message: 'Successfully players received' });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getPlayer = async function (req, res, next) {
    // Player ID
    var id = req.params.id;

    try {
        var player = await PlayerService.getPlayer(id);
        return res.status(200).json({ status: 200, data: player, message: 'Successfully player received' });
    } catch (e) {
        return res.status(404).json({ status: 404, message: e.message });
    }
};

exports.createPlayer = async function (req, res, next) {
    var player = {
        name: req.body.name,
        mains: req.body.mains,
        location: req.body.location,
        score: req.body.score
    };

    try {
        var createdPlayer = await PlayerService.createPlayer(player);
        return res.status(201).json({ status: 201, data: createdPlayer, message: 'Successfully created player' });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.updatePlayer = async function (req, res, next) {
    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({ status: 400, message: 'Id must be present' });
    }

    var id = req.body._id;

    var player = {
        id,
        name: req.body.name,
        mains: req.body.mains,
        location: req.body.location,
        score: req.body.score
    };

    try {
        var updatedPlayer = await PlayerService.updatePlayer(player);
        return res.status(200).json({ status: 200, data: updatedPlayer, message: 'Successfully updated player' });
    } catch (e) {
        return res.status(403).json({ status: 403, message: e.message });
    }
};

exports.deletePlayer = async function (req, res, next) {
    // Player ID
    var playerId = req.params.id;

    try {
        var player = await PlayerService.getPlayer(playerId);
        var matches = player.matches;
        
        // Delete the player
        var deleted = await PlayerService.deletePlayer(playerId);

        // Delete all his opponent matches
        if (matches) {
            for (let i = 0; i < matches.length; ++i) {
                const matchId = matches[i];
                const match = await MatchService.getMatch(matchId);

                // Remove the match from the opponent match lists
                const opponentId = match.player1 !== null ? match.player1._id : match.player2._id;
                await PlayerService.removeMatch(opponentId, matchId);

                // Remove the match from its tournament
                await TournamentService.removeMatch(match.tournament._id, matchId);

                // Delete the match
                MatchService.deleteMatch(matchId);
            }
        }

        return res.status(204).json({ status: 204, message: 'Successfully player deleted' });
    } catch (e) {
        return res.status(403).json({ status: 403, message: e.message });
    }
};
const Match = require('../models/match.model');

exports.getMatches = async function (query, page, limit) {
    // Options setup for the mongoose paginate
    var options = { page, limit };

    try {
        var matches = await Match.paginate(query, options);
        return matches;
    } catch (e) {
        throw Error('Invalid parameters');
    }
};

exports.getMatch = async function (id) {
    try {
        var match = await Match.findById(id)
            .populate('player1', ['name', 'mains'])
            .populate('player2', ['name', 'mains'])
            .populate('tournament', ['name']);

        if (match) {
            return match;
        } else {
            throw Error;
        }
    } catch (e) {
        throw Error('Match not found');
    }

};

exports.createMatch = async function (match) {
    var newMatch = new Match({
        player1: match.player1,
        player2: match.player2,
        score1: match.score1,
        score2: match.score2,
        tournament: match.tournament
    });

    // Avoid match with the same player
    if (match.player1 === match.player2) {
        throw Error('Player must be different');
    }

    try {
        // Saving the Match 
        var savedMatch = await newMatch.save();
        return savedMatch;
    } catch (e) {
        throw Error('Invalid parameters');
    }
};

exports.updateMatch = async function (match) {
    try {
        // Find the old Match Object by the Id
        var oldMatch = await Match.findById(match.id);
    } catch (e) {
        throw Error('Match not found');
    }

    // If no old Match Object exists return false
    if (!oldMatch) {
        return false;
    }

    // Edit the Match Object
    oldMatch.score1 = match.score1 != null ? match.score1 : oldMatch.score1;
    oldMatch.score2 = match.score2 != null ? match.score2 : oldMatch.score2;

    try {
        var savedMatch = await oldMatch.save();
        return savedMatch;
    } catch (e) {
        throw Error('Invalid parameters');
    }
};

exports.deleteMatch = async function (id) {
    try {
        var deleted = await Match.remove({ _id: id });
        if (deleted.result.n === 0) {
            throw Error('Match could not be deleted');
        }
        return deleted;
    } catch (e) {
        throw Error('Error occured while deleting the match');
    }
};
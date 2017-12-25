var Match = require('../models/match.model');

exports.getMatches = async function (query, page, limit) {
    var options = {
        page,
        limit
    };

    try {
        var matches = await Match.paginate(query, options);
        return matches;
    } catch (e) {
        throw Error('Error when paginating matches');
    }
};

exports.getMatch = async function (id) {
    try {
        var match = await Match.findById(id)
            .populate('player1', ['name', 'mains'])
            .populate('player2', ['name', 'mains'])
            .populate('tournament', ['name']);
        return match;
    } catch (e) {
        throw Error('Error while paginating match');
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

    try {
        // Saving the Match 
        var savedMatch = await newMatch.save();
        return savedMatch;
    } catch (e) {
        throw Error("Error while creating the match");
    }
};

exports.updateMatch = async function (match) {
    var id = match.id;

    try {
        // Find the old Match Object by the Id
        var oldMatch = await Match.findById(id);
    } catch (e) {
        throw Error("Error occured while finding the match");
    }

    // If no old Match Object exists return false
    if (!oldMatch) {
        return false;
    }

    // Edit the Match Object
    oldMatch.player1 = match.player1;
    oldMatch.player2 = match.player1;
    oldMatch.score1 = match.score1;
    oldMatch.score2 = match.score2;
    oldMatch.tournament = match.tournament;

    try {
        var savedMatch = await oldMatch.save();
        return savedMatch;
    } catch (e) {
        throw Error("Error occured while updating the match");
    }
};

exports.deleteMatch = async function (id) {
    try {
        var deleted = await Match.remove({ _id: id });
        if (deleted.result.n === 0) {
            throw Error("Match could not be deleted");
        }
        return deleted;
    } catch (e) {
        throw Error("Error occured while deleting the match");
    }
};
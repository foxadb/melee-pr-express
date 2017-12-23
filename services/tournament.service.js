var Tournament = require('../models/tournament.model');

exports.getTournaments = async function (query, page, limit) {
    var options = {
        page,
        limit
    };

    try {
        var tournaments = await Tournament.paginate(query, options);
        return tournaments;
    } catch (e) {
        throw Error('Error while paginating tournaments');
    }
};

exports.getTournament = async function (id) {
    try {
        var tournament = await Tournament.findById(id);
        return tournament;
    } catch (e) {
        throw Error('Error while paginating tournament');
    }
}

exports.createTournament = async function (tournament) {
    var newTournament = new Tournament({
        name: tournament.name,
        organiser: tournament.organiser,
        date: tournament.date,
        matches: tournament.matches
    });

    try {
        // Saving the Tournament 
        var savedTournament = await newTournament.save();
        return savedTournament;
    } catch (e) {
        throw Error("Error while creating tournament");
    }
}

exports.updateTournament = async function (tournament) {
    var id = tournament.id;

    try {
        // Find the old Tournament Object by the Id
        var oldTournament = await Tournament.findById(id);
    } catch (e) {
        throw Error("Error occured while finding the tournament");
    }

    // If no old Tournament Object exists return false
    if (!oldTournament) {
        return false;
    }

    // Edit the Tournament Object
    oldTournament.name = tournament.name;
    oldTournament.organiser = tournament.organiser;
    oldTournament.date = tournament.date;
    oldTournament.matches = tournament.matches;

    try {
        var savedTournament = await oldTournament.save();
        return savedTournament;
    } catch (e) {
        throw Error("Error occured while updating the tournament");
    }
}

exports.deleteTournament = async function (id) {
    try {
        var deleted = await Tournament.remove({ _id: id });
        if (deleted.result.n === 0) {
            throw Error("Tournament could not be deleted");
        }
        return deleted;
    } catch (e) {
        throw Error("Error occured while deleting the tournament");
    }
};

exports.addMatch = async function (tournamentId, matchId) {
    try {
        // Find the tournament
        var tournament = await Tournament.findById(tournamentId);
        
        // Push the new match to the list
        tournament.matches.push(matchId);

        // Save to the database
        await tournament.save();
        return tournament;
    } catch (e) {
        throw Error("Error occured while adding a match to a tournament");
    }
};

exports.removeMatch = async function (tournamentId, matchId) {
    try {
        // Find the player
        var tournament = await Tournament.findById(tournamentId);
        
        // Remove the match from the list
        tournament.matches = tournament.matches.filter(match => match != matchId);

        // Save to the database
        await tournament.save();
        return tournament;
    } catch (e) {
        throw Error("Error occured while removing a match from a tournament");
    }
};
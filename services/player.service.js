var Player = require('../models/player.model');
var Match = require('../models/match.model');

exports.getPlayers = async function (query, page, limit) {
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    };

    try {
        var players = await Player.paginate(query, options);
        return players;
    } catch (e) {
        throw Error('Error while Paginating Players');
    }
};

exports.getPlayer = async function (id) {
    try {
        var player = await Player.paginate({ _id: id });
        return player;
    } catch (e) {
        throw Error('Error while Paginating Player');
    }
}

exports.createPlayer = async function (player) {
    var newPlayer = new Player({
        name: player.name,
        mains: player.mains,
        score: player.score
    });

    try {
        // Saving the Player 
        var savedPlayer = await newPlayer.save();
        return savedPlayer;
    } catch (e) {
        throw Error("Error while Creating Player");
    }
}

exports.updatePlayer = async function (player) {
    var id = player.id;

    try {
        // Find the old Player Object by the Id
        var oldPlayer = await Player.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the Player");
    }

    // If no old Player Object exists return false
    if (!oldPlayer) {
        return false;
    }

    // Edit the Player Object
    oldPlayer.name = player.name;
    oldPlayer.mains = player.mains;
    oldPlayer.score = player.score;
    oldPlayer.matches = player.matches;

    try {
        var savedPlayer = await oldPlayer.save();
        return savedPlayer;
    } catch (e) {
        throw Error("And Error occured while updating the Player");
    }
}

exports.addMatch = async function (match) {
    try {
        var player1 = await Player.findById(match.player1);
        var player2 = await Player.findById(match.player2);
    } catch (e) {
        throw Error("Error occured while Finding Players");
    }
}

exports.deletePlayer = async function (id) {
    try {
        var deleted = await Player.remove({ _id: id });
        if (deleted.result.n === 0) {
            throw Error("Player Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Player");
    }
};
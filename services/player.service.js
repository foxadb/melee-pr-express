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
        throw Error('Error while paginating players');
    }
};

exports.getPlayer = async function (id) {
    try {
        var player = await Player.findById(id);
        return player;
    } catch (e) {
        throw Error('Error while paginating player');
    }
};

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
        throw Error("Error while creating player");
    }
};

exports.updatePlayer = async function (player) {
    var id = player.id;

    try {
        // Find the old Player Object by the Id
        var oldPlayer = await Player.findById(id);
    } catch (e) {
        throw Error("Error occured while finding the player");
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
        throw Error("Error occured while updating the player");
    }
};

exports.deletePlayer = async function (id) {
    try {
        var deleted = await Player.remove({ _id: id });
        if (deleted.result.n === 0) {
            throw Error("Player could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while deleting the player");
    }
};

exports.addMatch = async function (playerId, matchId) {
    try {
        // Find the player
        var player = await Player.findById(playerId);
        
        // Push the new match to the list
        player.matches.push(matchId);

        // Save to the database
        await player.save();
        return player;
    } catch (e) {
        throw Error("Error occured while adding a player match");
    }
};

exports.removeMatch = async function (playerId, matchId) {
    try {
        // Find the player
        var player = await Player.findById(playerId);
        
        // Remove the match from the list
        player.matches = player.matches.filter(match => match != matchId);

        // Save to the database
        await player.save();
        return player;
    } catch (e) {
        throw Error("Error occured while removing a player match");
    }
};
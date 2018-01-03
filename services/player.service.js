const Player = require('../models/player.model');
const Match = require('../models/match.model');
const EloRank = require('../models/elorank.model');

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
        throw Error('Error while finding the player');
    }
};

exports.createPlayer = async function (player) {
    var newPlayer = new Player({
        name: player.name,
        mains: player.mains,
        location: player.location,
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
    try {
        // Find the old Player Object by the Id
        var oldPlayer = await Player.findById(player.id);
    } catch (e) {
        throw Error("Error occured while finding the player");
    }

    // If no old Player Object exists return false
    if (!oldPlayer) {
        return false;
    }

    // Edit the Player Object
    oldPlayer.name = player.name != null ? player.name : oldPlayer.name;
    oldPlayer.mains = player.mains != null ? player.mains : oldPlayer.mains;
    oldPlayer.location = player.location != null ? player.location : oldPlayer.location;
    oldPlayer.score = player.score != null ? player.score : oldPlayer.score;
    oldPlayer.matches = player.matches != null ? player.matches : oldPlayer.matches;

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

        var savedPlayer = player.save();
        return savedPlayer;
    } catch (e) {
        throw Error("Error occured while adding a player match");
    }
};

exports.removeMatch = async function (playerId, matchId) {
    try {
        // Find the player
        var player = await Player.findById(playerId);
        
        // Remove the match from the list
        let index = player.matches.indexOf(matchId);
        if (index > -1) {
            player.matches.splice(index, 1);
        }

        // Save to the database
        await player.save();

        // Return the player
        return player;
    } catch (e) {
        throw Error("Error occured while removing a player match");
    }
};

exports.updateEloRank = async function (match) {
    try {
        // Find the players
        var player1 = await Player.findById(match.player1);
        var player2 = await Player.findById(match.player2);

        // Actual match result
        let actual;
        if (match.score1 > match.score2) {
            actual = 1;
        } else if (match.score1 < match.score2) {
            actual = 0;
        } else {
            actual = 0.5;
        }

        // Elo Rank System
        var eloRank = new EloRank(32);

        // Compute the new Elo Rank for Player 1
        player1.score = eloRank.compareAndUpdateRank(actual, player1.score, player2.score);

        // Compute the new Elo Rank for Player 2
        if (actual == 1) {
            actual = 0;
        } else if (actual == 0) {
            actual = 1;
        }
        player2.score = eloRank.compareAndUpdateRank(actual, player2.score, player1.score);

        // Save into the database
        await player1.save();
        await player2.save();
    } catch (e) {
        throw Error("Error occured while updating the Elo Rank");
    }
};
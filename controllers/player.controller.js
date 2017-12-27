const PlayerService = require('../services/player.service');

exports.getPlayers = async function (req, res, next) {
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 30;

    try {
        var players = await PlayerService.getPlayers({}, page, limit);
        return res.status(200).json({ status: 200, data: players, message: "Succesfully players received" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getPlayer = async function (req, res, next) {
    // Player ID
    var id = req.params.id;

    try {
        var player = await PlayerService.getPlayer(id);
        return res.status(200).json({ status: 200, data: player, message: "Successfully player received" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
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
        return res.status(201).json({ status: 201, data: createdPlayer, message: "Succesfully created player" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Player creation was unsuccesfull" });
    }
};

exports.updatePlayer = async function (req, res, next) {
    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({ status: 400., message: "Id must be present" });
    }

    var id = req.body._id;

    var player = {
        id,
        name: req.body.name ? req.body.name : null,
        mains: req.body.mains ? req.body.mains : null,
        location: req.body.location ? req.body.location : null,
        score: req.body.score ? req.body.score : null
    };

    try {
        var updatedPlayer = await PlayerService.updatePlayer(player);
        return res.status(200).json({ status: 200, data: updatedPlayer, message: "Succesfully updated player" });
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message });
    }
};

exports.removePlayer = async function (req, res, next) {
    // Player ID
    var id = req.params.id;

    try {
        await PlayerService.deletePlayer(id);
        return res.status(204).json({ status: 204, message: "Succesfully player deleted" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

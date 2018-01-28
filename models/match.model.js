const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const MatchSchema = new mongoose.Schema({
    player1: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', require: true },
    player2: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', require: true },
    score1: { type: Number, min: -1, default: 0 },
    score2: { type: Number, min: -1, default: 0 },
    tournament: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', require: true }
});

MatchSchema.plugin(mongoosePaginate);
const Match = mongoose.model('Match', MatchSchema);

module.exports = Match;
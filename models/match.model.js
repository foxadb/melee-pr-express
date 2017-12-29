const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const MatchSchema = new mongoose.Schema({
    player1: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    player2: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    score1: { type: Number, min: -1 },
    score2: { type: Number, min: -1 },
    tournament: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' }
});

MatchSchema.plugin(mongoosePaginate);
const Match = mongoose.model('Match', MatchSchema);

module.exports = Match;
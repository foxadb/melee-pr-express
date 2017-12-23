var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var MatchSchema = new mongoose.Schema({
    player1: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    player2: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    score1: { type: Number, min: -1, max: 5 },
    score2: { type: Number, min: -1, max: 5 },
    tournament: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' }
});

MatchSchema.plugin(mongoosePaginate);
const Match = mongoose.model('Match', MatchSchema);

module.exports = Match;
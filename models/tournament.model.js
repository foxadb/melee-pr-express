var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var TournamentSchema = new mongoose.Schema({
    name: { type: String, maxlength: 48, required: true },
    organiser: { type: String, maxlength: 24 },
    date: { type: Date, default: Date.now() },
    matches: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' } ]
});

TournamentSchema.plugin(mongoosePaginate);
const Tournament = mongoose.model('Tournament', TournamentSchema);

module.exports = Tournament;
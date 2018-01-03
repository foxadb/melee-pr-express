const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const TournamentSchema = new mongoose.Schema({
    name: { type: String, maxlength: 48, required: true },
    location: { type: String, maxlength: 24 },
    organiser: { type: String, maxlength: 24 },
    date: { type: Date, default: Date.now() },
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' }]
}, { usePushEach: true } );

TournamentSchema.plugin(mongoosePaginate);
const Tournament = mongoose.model('Tournament', TournamentSchema);

module.exports = Tournament;
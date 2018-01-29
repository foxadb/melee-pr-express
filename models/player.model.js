const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const PlayerSchema = new mongoose.Schema({
    name: { type: String, minlength: 3, maxlength: 24, required: true, unique: true },
    mains: [{ type: String, maxlength: 8 }],
    score: { type: Number, min: 1000, max: 3000, default: 1500 },
    location: { type: String, maxlength: 24 },
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }]
}, { usePushEach: true });

PlayerSchema.plugin(mongoosePaginate);
const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;
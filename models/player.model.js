var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var PlayerSchema = new mongoose.Schema({
    name: { type: String, maxlength: 24, required: true },
    mains: [ { type: String, maxlength: 8 } ],
    score: { type: Number, default: 1000 },
    matches: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Match' } ]
});

PlayerSchema.plugin(mongoosePaginate);
const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;
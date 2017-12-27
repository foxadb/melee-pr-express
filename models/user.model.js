const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

UserSchema.methods.comparePassword = async function (password) {
    try {
        var res = await bcrypt.compare(password, this.password);
        return res;
    } catch (e) {
        throw Error("Wrong password");
    }
};

UserSchema.plugin(mongoosePaginate);
const User = mongoose.model('User', UserSchema);

module.exports = User;
var mongoose = require('mongoose')
const Schema = mongoose.Schema;

const character = new Schema({
    _id: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId,
    stamina: Number,
    gold: Number,
    lastPosition: Array,
    name: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('character', character);
var mongoose = require('mongoose')
const Schema = mongoose.Schema;

const genre = new Schema({
    _id: Schema.Types.ObjectId,
    images: String,
    label: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('category', genre);
var mongoose = require('mongoose')
const Schema = mongoose.Schema;

const genre = new Schema({
    _id: Schema.Types.ObjectId,
    customer: Schema.Types.ObjectId,
    billDetail: Array,
    date: Date,
    status: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('category', genre);
var mongoose = require('mongoose')
const Schema = mongoose.Schema;

const bill = new Schema({
    _id: Schema.Types.ObjectId,
    customer: Schema.Types.ObjectId,
    listCart: Array,
    date: Date,
    status: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('bill', bill);
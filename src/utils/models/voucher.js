var mongoose = require('mongoose')
const Schema = mongoose.Schema;

const voucher = new Schema({
    min: Number, 
    sale: Number,
    type: Number,
    point: Number,
    status: Number,
    images: String,
    value: Number,
    description: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('voucher', voucher);
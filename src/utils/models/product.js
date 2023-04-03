var mongoose = require('mongoose')
const Schema = mongoose.Schema;

const product = new Schema({
    _id: Schema.Types.ObjectId,
    owner: String,
    type: Schema.Types.ObjectId,
    name: String,
    images: Array,
    stock: Array,
    sale: Number,
    sold: Number, 
    status: Number,
    description: String,
    date: Date,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('product', product);
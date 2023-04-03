var mongoose = require('mongoose')
const Schema = mongoose.Schema;

const store = new Schema({
    _id: Schema.Types.ObjectId,
    owner: String,
    password: String,
    email: String,
    address: String,
    nameShop: String,
    avatar: String,
    status: Number, 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('store', store);
var mongoose = require('mongoose')
const Schema = mongoose.Schema;

const user = new Schema({
    _id: Schema.Types.ObjectId,
    userName: String,
    password: String,
    avatar: String,
    date: Date,
    nickName: String,
    email: String,
    role: String,
    address: String, 
    status: Number,
    vouchers: Array,
    card: String,
    tokenDevice: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('user', user);
var mongoose = require('mongoose')
const Schema = mongoose.Schema;

const notification = new Schema({
    _id: Schema.Types.ObjectId,
    owner: Schema.Types.ObjectId,
    idBill: Schema.Types.ObjectId,
    title: String,
    message: String,
    Date: Date,
    status: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('notification', notification);
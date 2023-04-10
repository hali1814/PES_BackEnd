var mongoose = require('mongoose')
const Schema = mongoose.Schema;

const rate = new Schema({
    _id: Schema.Types.ObjectId,
    customer: Schema.Types.ObjectId,
    idBill: Schema.Types.ObjectId,
    start: Number,
    msg: String,
    images: Array,
    status: Number, // 0 là chưa đánh giá/ 1 là đã đánh giá
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('rate', rate);
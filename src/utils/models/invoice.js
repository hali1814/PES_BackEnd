var mongoose = require('mongoose')
const Schema = mongoose.Schema;

const invoice = new Schema({
    _id: Schema.Types.ObjectId,
    idProduct: Schema.Types.ObjectId,
    customer: Schema.Types.ObjectId,
    date: Date,
    amount: Number,
    quantity: Number,
    payment_method: String,
    message: String,
    information: Array,
    color: String,
    size: String,
    vouchers: Array,
    discount_shipping: Number,
    shipping_price: Number,
    discount: Number,
    status: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('invoice', invoice);
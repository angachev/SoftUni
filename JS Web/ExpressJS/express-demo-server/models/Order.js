const mongoose = require('mongoose');
const encryption = require('../util/encryption');
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({
    user: { type: ObjectId, ref:'User'},
    product: { type: ObjectId, ref:'Product' },
    toppings: [{ type: mongoose.Schema.Types.String }],
    status:{type:mongoose.Schema.Types.String, default:'Pending'},
    dateOfCreation:{type:Date,default:Date.now()}
});


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
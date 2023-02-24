const mongoose = require('mongoose');

const transcationSchema = new mongoose.Schema({
    titel: {type: String, require: true},
    amount: {type: Number, require: true},
    type: {type: String, require: true},

}, {timestamps: true})

const Transaction  = mongoose.model('transaction', transcationSchema)
module.exports = Transaction;
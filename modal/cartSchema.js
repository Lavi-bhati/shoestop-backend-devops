
const mongoose = require('mongoose');
const users = require('./user');

const cartSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },

    company: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        default: 1,
        min: 1
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: users,
        required: true
    }
});

const cart = mongoose.model('cartSchema', cartSchema);

module.exports = cart;

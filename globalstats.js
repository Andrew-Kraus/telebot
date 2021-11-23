const mongoose = require('mongoose');

const globalStats = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    games: {
        type: Number,
        required: true,
    },
    deals: {
        type: Number,
        required: true,
    },
    sales: {
        type: Number,
        required: true,
    },
    purchases: {
        type: Number,
        required: true,
    },
    disputes: {
        type: Number,
        required: true,
    },
    games_chips: {
        type: Number,
        required: true,
    },
    games_cash: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('globalStats', globalStats);
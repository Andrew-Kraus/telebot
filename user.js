const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
    id: {
        type: Number,
        required: true,
        unique: true,
     },
    username: {
        type: String,
        required: true,
     },
    name: {
       type: String,
       required: true,
     },
    balance: {
        type: Number,
        required: true,
    },
    game_balance: {
        type: Number,
        required: true,
    },
    date: {
        type: Number,
        required: true,
    },
    deals: {
        type: Number,
        required: true,
    },
    deals_seller: {
        type: Number,
        required: true,
    },
    deals_buyer: {
        type: Number,
        required: true,
    },
    games: {
        type: Number,
        required: true,
    },
    win: {
        type: Number,
        required: true,
    },

    lose: {
        type: Number,
        required: true,
    },

    dice: {
        type: Number,
        required: true,
    },

    dice_win: {
        type: Number,
        required: true,
    },
    dice_lose: {
        type: Number,
        required: true,
    },

    double_dice: {
        type: Number,
        required: true,
    },

    double_dice_win: {
        type: Number,
        required: true,
    },
    double_dice_lose: {
        type: Number,
        required: true,
    },

    darts: {
        type: Number,
        required: true,
    },

    darts_win: {
        type: Number,
        required: true,
    },
    darts_lose: {
        type: Number,
        required: true,
    },

    basketball: {
        type: Number,
        required: true,
    },


    basketball_win: {
        type: Number,
        required: true,
    },
    basketball_lose: {
        type: Number,
        required: true,
    },

    jackpot: {
        type: Number,
        required: true,
    },

    jackpot_win: {
        type: Number,
        required: true,
    },
    jackpot_lose: {
        type: Number,
        required: true,
    },

    slot: {
        type: Number,
        required: true,
    },

    slot_win: {
        type: Number,
        required: true,
    },
    slot_lose: {
        type: Number,
        required: true,
    },
    banned: {
        type: String,
    },
})

module.exports = mongoose.model('user', userSchema);
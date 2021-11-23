const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({ 
    id: {
        type: Number,
        required: true,
        unique: true,
     },
    owner: {
        type: Number,
        required: true,
     },
    gameName: {
       type: String,
       required: true,
     },
    price: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model('game', gameSchema);
const { Schema, model } = require('mongoose');

const gameSchema = new Schema({
    location: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    totalPlayers: {
        type: Number,
        required: true
    },
    players: {
        type: Number,
        default: 1
    }
}, {
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true } 
});

gameSchema.virtual('slots').get(function() {
    return this.totalPlayers - this.players;
});

const Game = model('Game', gameSchema);

module.exports = Game;

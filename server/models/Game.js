const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const gameSchema = new Schema(
    {
        title: {
            type: String,
            default: 'Default Game Name'
        },
        location: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        totalPlayers: {
            type: Number,
            required: true,
        },
        players: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Request',
            },
        ],
        requests: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Request',
            },
        ],
        date: {
            type: Date,
            default: Date.now(),
            get: (timestamp) => dateFormat(timestamp),
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

gameSchema.virtual('slots').get(function () {
    return this.totalPlayers - this.players.length;
});

const Game = model('Game', gameSchema);

module.exports = Game;

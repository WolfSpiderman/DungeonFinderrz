const { Schema, model } = require('mongoose');
const requestSchema = require('./Request');
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
        maxPlayers: {
            type: Number,
            required: true,
        },
        players: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        requests: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Request'
            }
        ],
        date: {
            type: Date,
            default: Date.now(),
            get: (timestamp) => dateFormat(timestamp),
        },
        // madeBy: {
        //   type: Schema.Types.ObjectId,
        //   ref: 'User',
        //   required: true,
        // }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

gameSchema.virtual('slots').get(function () {
    return this.maxPlayers - this.players.length;
});

const Game = model('Game', gameSchema);

module.exports = Game;

const { Schema, model } = require('mongoose');

const gameSchema = new Schema(
    {
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
                autopopulate: { select: 'name', match: { approved: true } },
            },
        ],
        requests: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Request',
                autopopulate: { select: 'name', match: { approved: null } },
            },
        ],
        date: {
            type: Date,
            default: Date.now(),
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

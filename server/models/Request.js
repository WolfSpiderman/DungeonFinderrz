const { Schema, model } = require('mongoose');

const requestSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    gameId: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    role: {
        type: String,
        enum: ['DM', 'player'],
    },
    class: {
        type: String,
    }
},
{
    toJSON: {
        virtuals: true
    }
});

const Request = model('Request', requestSchema);

module.exports = Request;

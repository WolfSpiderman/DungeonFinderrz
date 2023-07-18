const { Schema, model } = require('mongoose');

const requestSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    player: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: null
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game'
    }
},
{
    toJSON: {
        virtuals: true
    }
});

const Request = model('Request', requestSchema);

module.exports = Request;
const { Schema, model } = require('mongoose');

const requestSchema = new Schema({
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
        type: String,
        required: true
    }
},
{
    toJSON: {
        virtuals: true
    }
});

const Request = model('Request', requestSchema);

module.exports = Request;
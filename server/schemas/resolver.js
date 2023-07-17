const { User, Game, Requests } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({}).populate('requests')
        },

        games: async () => {
            return await Game.find({})
        },
        requests: async () => {
            return await Request.find({}).populate('games')
        }
    }
};

module.exports = resolvers;
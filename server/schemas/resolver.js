const { User, Game, Request } = require('../models');

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
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
          const user = await User.create({ username, email, password });
          const token = signToken(user);
          return { token, user };
        },
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
    
          if (!user) {
            throw new AuthenticationError('No user found with this email address');
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
          }
    
          const token = signToken(user);
    
          return { token, user };
        },
      }
};

module.exports = resolvers;
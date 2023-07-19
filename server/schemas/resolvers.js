const { User, Game, Request } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        users: async () => {
          return await User.find({}).populate('requests')
        },
        user: async (parent, { id }) => {
          return await User.findById(id).populate('requests')
        },
        games: async () => {
          return await Game.find({})
        },
        game: async (parent, { id }) => {
          return await Game.findById(id)
        },        
        requests: async () => {
          return await Request.find({}).populate('games')
        },
        request: async (parent, { id }) => {
          return await Request.findById(id).populate('games')
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
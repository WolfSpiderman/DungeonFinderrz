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
        addRequest: async (_, { userId, gameId }) => {
          try {
            const user = await User.findById(userId);
            const game = await Game.findById(gameId);
    
            if (!user) {
              throw new Error('User not found');
            }
    
            if (!game) {
              throw new Error('Game not found');
            }
    
            const request = new Request({
              player: user.username,
              role: 'Player',
              approved: false,
              game: [game],
            });
    
            user.attendedGames.push(request);
            await user.save();
    
            return request;
          } catch (error) {
            throw new Error(error.message);
          }
        },
    
        approveRequest: async (_, { userId, gameId }) => {
          try {
            const user = await User.findById(userId);
            const game = await Game.findById(gameId);
    
            if (!user) {
              throw new Error('User not found');
            }
    
            if (!game) {
              throw new Error('Game not found');
            }
    
            const request = user.attendedGames.find((request) => request.game[0].toString() === gameId && !request.approved);
    
            if (!request) {
              throw new Error('Request not found');
            }
    
            request.approved = true;
    
            await user.save();
    
            return request;
          } catch (error) {
            throw new Error(error.message);
          }
        },
    
        denyRequest: async (_, { userId, gameId }) => {
          try {
            const user = await User.findById(userId);
            const game = await Game.findById(gameId);
    
            if (!user) {
              throw new Error('User not found');
            }
    
            if (!game) {
              throw new Error('Game not found');
            }
    
            const request = user.attendedGames.find((request) => request.game[0].toString() === gameId && !request.approved);
    
            if (!request) {
              throw new Error('Request not found');
            }
    
            await request.remove();
            await user.save();
    
            return request;
          } catch (error) {
            throw new Error(error.message);
          }
        },
      }
};

module.exports = resolvers;
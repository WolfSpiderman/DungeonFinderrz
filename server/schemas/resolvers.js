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
        addRequest: async (parent, { userId, gameId, role }) => {
          try {
            const user = await User.findById(userId);
            const game = await Game.findById(gameId);
    
            console.log(user);
            console.log(game);
            if (!user) {
              throw new Error('User not found');
            }
    
            if (!game) {
              throw new Error('Game not found');
            }
    
            const request = Request.create({
              player: user.username,
              role: role,
              approved: null,
              game: game.title
            });
    
            user.attendedGames.push(request._id);
            await user.save();

            game.requests.push(request._id);
            await game.save();
    
            return request;
          } catch (error) {
            throw new Error(error.message);
          }
        },
        approveRequest: async (parent, { userId, gameId }) => {
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
    
        denyRequest: async (parent, { userId, gameId }) => {
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
        addGame: (parent, { title, location, description, date, totalPlayers }) => {
          const newGame = Game.create({
            title,
            location,
            description,
            date,
            totalPlayers,
            players: [],
            requests: [],
            slots: 0
          });
    
          return newGame;
        },
        removeGame: async (parent, { id }) => {
          const game = await Game.findByIdAndDelete(id);

          if (!game) {
            throw new Error('No game found with this id');
          }

          return game;
        }
      },
      User: {
        attendedGames: async (parent) => {
          try {
            // Fetch the user's attended games and populate the 'requests' field.
            const user = await User.findById(parent._id).populate('requests');
            
            // Return the 'requests' field 
            if (user) {
              return user.requests;
            }
            return [];
          } catch (error) {
            throw new Error('Unable to fetch attended games');
          }
        },
      },
      
  };
module.exports = resolvers;
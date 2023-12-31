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
          return await Game.find({}).populate('players').populate('requests')
        },
        game: async (parent, { id }) => {
          return await Game.findById(id).populate('players').populate('requests')
        },        
        requests: async () => {
          return (await Request.find({})).populate('games')
        },
        request: async (parent, { id }) => {
          return await Request.findById(id).populate('games')
        },
        checkRequestExists: async (parent, { gameId, userId }) => {
          const existingRequest = await Request.findOne({ gameId, userId });
          return !!existingRequest;
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
          game: game.title,
          gameId: gameId,
          userId: userId
        });

        // user.attendedGames.push(request._id);
        // await user.save();

        game.requests.push((await request)._id);
        await game.save();
        await game.populate('requests'); // Populate requests array

        return request;
      } catch (error) {
        throw new Error(error.message);
      }
    },
        approveRequest: async (parent, { requestId }) => {
          try {
            const request = await Request.findById(requestId);
        
            if (!request) {
              throw new Error('Request not found');
            }
        
            if (request.approved) {
              throw new Error('Request has already been approved');
            }
        
            request.approved = true;
            
            const user = await User.findById(request.userId);
            const game = await Game.findById(request.gameId);
        
            if (!user) {
              throw new Error('User not found');
            }
        
            if (!game) {
              throw new Error('Game not found');
            }
        
            game.players.push(user._id);
        
            await Promise.all([request.save(), game.save()]);
        
            return request;
          } catch (error) {
            throw new Error(error.message);
          }
        },
        denyRequest: async (parent, { requestId }) => {
          try {
            const request = await Request.findById(requestId);
    
            if (!request) {
              throw new Error('Request not found');
            }
    
            request.approved = false;
    
            const user = await User.findById(request.userId);
            const game = await Game.findById(request.gameId);

            if (!user) {
              throw new Error('User not found!');
            }

            if (!game) {
              throw new Error('Game not found!');
            }

            user.attendedGames = user.attendedGames.filter((gameId) => gameId !== request.gameId);

            game.requests = game.requests.filter((reqId) => reqId !== request._id);

            await Promise.all([request.save(), user.save(), game.save()])
    
            return request;
          } catch (error) {
            throw new Error(error.message);
          }
        },
        addGame: async (parent, { title, location, description, date, totalPlayers }, context) => {
          // Assuming you have a way to get the authenticated user's ID from the context
          // const madeBy = context.userId;
        
          const newGame = await Game.create({
            title,
            location,
            description,
            date,
            totalPlayers,
            players: [],
            requests: [],
            // madeBy,
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
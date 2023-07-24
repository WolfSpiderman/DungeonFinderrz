const db = require('../config/connection');
const { User, Game, Request } = require('../models');

const userData = require('./userData.json');
const gameData = require('./gameData.json');
const requestData = require('./requestData.json');

db.once('open', async() => {
  await User.deleteMany({});
  await Game.deleteMany({});
  await Request.deleteMany({});

  const users = await User.insertMany(userData);
  const games = await Game.insertMany(gameData);
  const requests = await Request.insertMany(requestData);

  console.log('Database seeded with users, games, and requests');
  process.exit(0);
});
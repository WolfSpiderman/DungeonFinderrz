const db = require('../config/connection');
const { User } = require('../models');
const { Game } = require('../models');

const userData = require('./userData.json');
// const gameData = require('./gameData.json');

db.once('open', async() => {
  await User.deleteMany({});
  await Game.deleteMany({});

  const users = await User.insertMany(userData);
  // const games = await Game.insertMany(gameData);

  console.log('Database seeded with users');
  process.exit(0);
});
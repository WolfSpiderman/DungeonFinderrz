const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User'); 

exports.register = async (req, res) => {
  const { username, password } = req.body;

  const userExists = await User.findOne({ username });
  if (userExists) return res.status(400).json({ error: 'Username already exists' });

 
  const hashedPassword = await bcrypt.hash(password, 10);


  const user = new User({
    username,
    password: hashedPassword,
  });

  await user.save();

  
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.json({ token });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;


  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'Invalid username or password' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ error: 'Invalid username or password' });

 
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.json({ token });
};
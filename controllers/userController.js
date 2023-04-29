const UserModel = require("../models/userSchema");
const jwt = require('jsonwebtoken');
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();

async function register(req, res, next) {
  const { username, password } = req.body;
  try {
    const user = new UserModel({
      username: username,
      password: password
    });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while creating the user' });
  }
}

function login(req, res) {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
      console.log(err)
      return res.status(400).json({
        message: 'Something is not right',
        user : user
      });
    }

    req.login(user, {session: false}, (err) => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY);
      return res.json({user, token});
    });
  })(req, res);
}

module.exports = { register, login };

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");
const { UserModel: User } = require("./models/userSchema");
const user = require('./routes/userRouter')
const bcrypt = require("bcryptjs");
const authRouter = require("./routes/AuthRouter");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;
const MONGODBURL = "mongodb://mongo:CqSwT4VM97ssiFKbDwe1@containers-us-west-90.railway.app:5951";
const app = express();

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(MONGODBURL);
}

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user);
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" });
        }
      });
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    },
    (jwtPayload, cb) => {
      User.findById(jwtPayload.id)
        .then((user) => {
          if (!user) {
            return cb(null, false);
          }
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err, false);
        });
    }
  )
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ hello: "hello" });
});

app.use("/api", authRouter);
app.use('/api', passport.authenticate('jwt', {session: false}), user);
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

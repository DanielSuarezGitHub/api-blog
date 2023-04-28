const bcrypt = require("bcryptjs");
const passport = require("passport");
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy
const { UserModel: User } = require("./models/userSchema");



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
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
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
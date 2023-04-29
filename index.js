const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/AuthRouter");
const cors = require('cors')
const passport = require('passport')
require('./passport')


const port = process.env.PORT;
const MONGODBURL = "mongodb://mongo:CqSwT4VM97ssiFKbDwe1@containers-us-west-90.railway.app:5951";
const app = express();
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(MONGODBURL);
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use((req, res, next) => {
  console.log(req.headers.authorization);
  console.log(process.env.JWT_SECRET_KEY)
  console.log('Working')
  next();
});


app.use("/", authRouter);



app.use('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.send(req.user)
});


app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});


module.exports = app;

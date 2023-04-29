const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, minlength: 4 },
  password: { type: String, required: true, minlength: 6 },
  posts: [{ type: Schema.Types.ObjectId, ref: 'post' }],
});

UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;

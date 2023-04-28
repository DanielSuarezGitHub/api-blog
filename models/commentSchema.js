const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
});

const CommentModel = model('Comment', CommentSchema);

module.exports = { CommentModel };

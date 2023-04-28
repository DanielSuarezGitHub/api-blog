const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { default: Date.now(), type: Date },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  published: { default: false, type: Boolean },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

const PostModel = model('Post', PostSchema);

module.exports = { PostModel };

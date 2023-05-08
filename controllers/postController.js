const PostModel = require("../models/postSchema")
const CommentModel = require('../models/commentSchema');
const { default: mongoose } = require("mongoose");

exports.createPost = async function createPost(req, res, next) {
    try {
        const post = new PostModel({
            title: req.body.title,
            content: req.body.content,
            date: Date.now(),
            author: req.user._id,
        });
        await post.save()
        res.status(201).json({message: "Post successfully created"})
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'An error occurred while creating the post' });
    }
}

exports.publishPost = async function publishPost(req, res, next) {
    try {
    let post = await PostModel.findById(req.params.id)
    if (!post.published) {
        post.published = true
        post.save()
    } else {
        post.published = false
        post.save()
    }
    res.status(201).json({message: "successfully updated post"})
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'An error occurred while publishing the post' });
    }
}

exports.updatePost = async function updatePost(req, res, next) {
    try {   
        let updatedPost = { ...req.body };
        await PostModel.findByIdAndUpdate(req.params.id, updatedPost);
        res.status(201).json({message: "successfully updated post"})
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while updating the post' });
    }
};


exports.deletePost = async function deletePost(req, res, next) {
    try {
        let post = await PostModel.findById(req.params.id)
        if ( post.author.toString() == req.user._id.toString()) {
            await CommentModel.deleteMany({ post: req.params.id })
            await PostModel.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Successfully deleted post with comments." });
        } else {
            throw new Error("post doesn't exist")
        }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Successfully deleted post." });
    }
  }
  
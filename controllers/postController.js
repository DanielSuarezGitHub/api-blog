const PostModel = require("../models/postSchema")

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
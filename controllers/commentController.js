const CommentModel = require('../models/commentSchema')
const PostModel = require('../models/postSchema')


exports.createComment = async function createComment(req, res, next) {
 try {
    const doc = await PostModel.findById(req.params.id)
    if (!doc) {
        throw new Error("document not found")
    } else {
        const comment = new CommentModel({
            content: req.body.content,
            author: req.user._id,
            post: req.params.id
        })
        await comment.save()
        res.status(201).json({message: "successfully created comment"})
    }
 } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Oops an error occurred while processing your comment"})
 }
}

exports.deleteComment = async function deleteComment(req, res, next) {
    try {
        const doc = await CommentModel.findByIdAndDelete(req.params.commentid)
        if (!doc) {
            throw new Error("document not found")
        }
        res.status(201).json({message: "successfully deleted comment"})       
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: "an error occurred while deleting your comment"})  
    }
}

exports.getPostComments = async function(req, res, next) {
    try {
       const comments = await CommentModel.find({ post: req.params.id})
       res.json(comments) 
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "an error occurred while fetching post comments"})
    }
}
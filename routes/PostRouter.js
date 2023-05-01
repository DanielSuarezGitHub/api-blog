// create post view post edit post
const express = require('express')
const router = express.Router()
const controller = require('../controllers/postController')
const passport = require('passport')

router.post('/posts', passport.authenticate('jwt', {session: false}), controller.createPost)
router.post('/posts/:id/publish', passport.authenticate('jwt', {session: false}), controller.publishPost)
router.put('/posts/:id', controller.updatePost)
module.exports = router;
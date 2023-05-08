const express = require('express')
const router = express.Router()
const controller = require('../controllers/commentController')
const passport = require('passport')


router.post("/posts/:id/comment", passport.authenticate('jwt', {session: false}), controller.createComment)
router.delete("/posts/:id/comment/:commentid", passport.authenticate('jwt', {session: false}), controller.deleteComment)
router.get("/posts/:id/comment/", passport.authenticate('jwt', {session: false}), controller.getPostComments)
module.exports = router;
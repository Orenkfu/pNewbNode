const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Comment, validate } = require('../models/comment');


module.exports.create = async function create(comment) {
    comment = new Comment({
        body: comment.body,
        forumId: comment.forumId,
        post:
            {
                _id: comment.post._id,
                title: comment.post.title,
            },
        user:
            {
                _id: comment.user._id,
                username: comment.user.username
            }

    });
    return await comment.save();
}
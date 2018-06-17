const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Post, validate } = require('../models/post');


module.exports.create = async function create(post) {
    post = new Post({
        title: post.title,
        body: post.body,
        forumId: post.forumId,
        user:
            {
                _id: post.user._id,
                username: post.user.username
            }

    });
    return await post.save();
}
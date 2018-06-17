
const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');
Joi.objectId = require('joi-objectid')(Joi);


const Post = mongoose.model('Posts', new mongoose.Schema({
    forumId:
        {
            type: mongoose.Schema.ObjectId,
            required: true,
        },
    title:
        {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 75,
            trim: true
        },
    body:
        {
            type: String,
            required: true,
            trim: true,
        },
    posted_date:
        {
            type: Date,
            default: Date.now(),
        },
    user: {
        _id: {
            type: mongoose.Schema.ObjectId,
            required: true
        },
        username: {
            type: String,
            required: true
        }

    }
}));

function validatePost(post) {
    const schema = {
        forumId: Joi.objectId().required(),
        title: Joi.string().min(1).max(75).required(),
        body: Joi.string().required().max(500),
        posted_date: Joi.date(),
        user: {
            _id: Joi.objectId().required(),
            username: Joi.string()
        }
    };
    return Joi.validate(post, schema);
}

exports.Post = Post;
exports.validate = validatePost;
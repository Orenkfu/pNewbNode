
const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');
Joi.objectId = require('joi-objectid')(Joi);


const Comment = mongoose.model('Comments', new mongoose.Schema({
    forumId:
        {
            type: mongoose.Schema.ObjectId,
            required: true,
        },
    post:
        {
            _id:
                {
                    type: mongoose.Schema.ObjectId,
                    required: true
                },
            title:
                {
                    type: String,
                    required: true,
                    trim: true
                }

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

function validateComment(comment) {
    const schema = {
        forumId: Joi.objectId().required(),
        body: Joi.string().required().max(500),
        posted_date: Joi.date(),
        post: {
            _id: Joi.objectId().required(),
            title: Joi.string().required(),
        },
        user: {
            _id: Joi.objectId().required(),
            username: Joi.string()
        }
    };
    return Joi.validate(comment, schema);
}

exports.Comment = Comment;
exports.validate = validateComment;
const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');
const categorySchema = require('./forumCategory');
Joi.objectId = require('joi-objectid')(Joi);

const forumSchema = new mongoose.Schema({
    name:
        {
            type: String,
            required: true,
            min: 2,
            max: 40,
            trim: true
        },
    category: {
        type: categorySchema,
        required: true
    },
    categoryId: mongoose.Schema.ObjectId
});

function validateForum(forum) {
    const schema = {
        name: Joi.string().min(3).max(40).required(),
        category: Joi.object(),
        categoryId: Joi.objectId()

    };
    return Joi.validate(forum, schema);
}

const Forum = mongoose.model('Forums', forumSchema);

exports.Forum = Forum;
exports.validateForum = validateForum;

const Joi = require('joi');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    order: Number,
    name: {
        type: String,
        required: true,
        enum: ['Java', 'Python', 'Javascript', 'Ruby', 'PHP', 'General', 'System']
    },
    description: String
});

function validateCategory(category) {
    const schema = {
        order: Joi.number().required(),
        description: Joi.string().max(100),
        name: Joi.string().min(4).max(35).required()
    };
    return Joi.validate(category, schema);
}

const Category = mongoose.model('forum-categories', categorySchema);

exports.Category = Category;
exports.validateCategory = validateCategory;

const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    username:
        {
            type: String,
            required: true,
            min: 3,
            max: 40,
            trim: true
        },
    email:
        {
            type: String,
            required: true,
            unique: true,
            min: 5,
            max: 35,
            trim: true,
        },
    password:
        {
            type: String,
            required: true,
            min: 4,
            max: 455,
            trim: true
        }
});

function validateUser(user) {
    const schema = {
        username: Joi.string().min(3).max(40).required(),
        email: Joi.string().min(5).max(35).required().email(),
        password: Joi.string().min(4).max(455).required(),
    };
    return Joi.validate(user, schema);
}
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
    },
        config.get('jwtPrivateKey'),
    );
}

const User = mongoose.model('Users', userSchema);

exports.User = User;
exports.validate = validateUser;

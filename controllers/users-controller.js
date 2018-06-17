const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { User, validate } = require('../models/user');
const userDao = require('../dal/user-dao');

//getAllUsers
//banUser
//createUser
//updateUserProfile
module.exports = router;
const { Category, validateCategory } = require('../models/forumCategory');
const express = require('express');
const Joi = require('joi');
const forumDao = require('../dal/forum-dao');
const router = express.Router();
router.get('/', async (req, res) => {

    const categories = await Category.find().sort({ order: 1 });

    return res.status(200).send(categories);
});

module.exports = router;
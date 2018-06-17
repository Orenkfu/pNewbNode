const { Comment, validate } = require('../models/comment');
const express = require('express');
const Joi = require('joi');
const commentDao = require('../dal/comment-dao');
const router = express.Router();


//create post
router.post('/', async (req, res) => {
    const _comment = req.body;
    const { error } = validate(_comment);
    if (error) return res.status(400).send(error.details[0].message);

    const comment = await commentDao.create(_comment);

    return res.status(200).send(comment);
});

router.get('/', async (req, res) => {

    const comments = await Comment.find();

    return res.status(200).send(comments);
});

module.exports = router;
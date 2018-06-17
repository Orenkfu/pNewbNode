const { Post, validate } = require('../models/post');
const express = require('express');
const Joi = require('joi');
const postDao = require('../dal/post-dao');
const router = express.Router();


//create post
router.post('/', async (req, res) => {
    const _post = req.body;
    const { error } = validate(_post);
    if (error) return res.status(400).send(error.details[0].message);

    const post = await postDao.create(_post);



    return res.status(200).send(post);
});

//getallposts
router.get('/', async (req, res) => {

    const posts = await Post.find();
    return res.status(200).send(posts);
});
//get single post
router.get('/:id', async (req, res) => {

    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(404).send('Post was not found.');
    }
    return res.status(200).send(post);
});
//getbyforum
router.get('/byForum/:id', async (req, res) => {

    const posts = await Post.find({ forumId: req.params.id }).sort({ posted_date: 1 })

    return res.status(200).send(posts);
});

//getbyuser
router.get('/byUser/:id', async (req, res) => {

    const posts = await Post.find({ 'user._id': req.params.id }).sort({ posted_date: 1 })


    return res.status(200).send(posts);
});
module.exports = router;
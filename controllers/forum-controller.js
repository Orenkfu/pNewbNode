const { Forum, validateForum } = require('../models/forum');
const express = require('express');
const Joi = require('joi');
const forumDao = require('../dal/forum-dao');
const router = express.Router();

//requires better validation to make sure a proper forum is established
//createforum
router.post('/', async (req, res) => {
    let receivedForum = req.body;
    const { error } = validateForum(receivedForum);
    if (error) return res.status(400).send(error.details[0].message);

    let forum = await Forum.findOne({ name: receivedForum.name });
    if (forum) return res.status(400).send('This forum already exists.');

    const _forum = await forumDao.create(receivedForum);



    return res.status(200).send(_forum);
});

//getallforums
router.get('/', async (req, res) => {

    const forums = await Forum.find();

    return res.status(200).send(forums);
});

router.get('/byCategory/:name', async (req, res) => {

    const forums = await Forum.find({ 'category.name': req.params.name })

    return res.status(200).send(forums);
});

router.get('/:id', async (req, res) => {

    const forum = await Forum.findById(req.params.id)
    if (!forum) return res.status(404).send('The forum with the given ID was not found.');

    return res.status(200).send(forum);
});
module.exports = router;
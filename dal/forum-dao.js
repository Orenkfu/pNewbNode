const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Forum, validate } = require('../models/forum');


module.exports.create = async function createForum(forum) {
    forum = new Forum({
        name: forum.name,
        category: forum.category,
        categoryId: forum.categoryId
    });
    await forum.save();
    return forum;
}
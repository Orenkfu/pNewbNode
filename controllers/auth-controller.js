const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { User, validate } = require('../models/user');
const userDao = require('../dal/user-dao');
const _ = require('lodash');
const auth = require('../middleware/auth');

//SIGN UP
router.post('/new', async (req, res) => {
    let receivedUser = req.body;
    const { error } = validate(receivedUser);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: receivedUser.email });
    if (user) return res.status(400).send('Invalid email or password.');

    user = await userDao.createUser(receivedUser);

    const token = user.generateAuthToken();
    console.log('token: ', token);
    user.token = token;
    res.send(_.pick(user, ['_id', 'username', 'email', 'token']));
});

//LOG IN
router.post('/', async (req, res) => {
    let receivedUser = req.body;
    console.log(receivedUser)
    const { error } = validateLogin(receivedUser);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await userDao.login(receivedUser);
    if (!user) return res.status(400).send('Invalid email or password.');
    console.log(user);
    const token = user.generateAuthToken();
    return res.send({ token: token });


});
//CURRENT USER 
router.get('/me', auth, async (req, res) => {
    const user = await userDao.getById(req.user._id);
    res.send(user);
});

function validateLogin(user) {
    const schema = {
        email: Joi.string().min(5).max(35).required().email(),
        password: Joi.string().min(4).max(455).required(),
    };
    return Joi.validate(user, schema);
}


module.exports = router;
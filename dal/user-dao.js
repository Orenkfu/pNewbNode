const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');




async function login(loginDetails) {
    let user = await User.findOne({ email: loginDetails.email });
    //opposite of signup: if user doesnt exist, details are invalid.
    if (!user) return false;
    const isMatch = await bcrypt.compare(loginDetails.password, user.password);
    return isMatch ? user : null;

}

async function createUser(receivedUser) {
    user = new User({
        username: receivedUser.username,
        email: receivedUser.email,
        password: receivedUser.password,
    });
    const pass = user.password;
    user.password = await bcryptHash(user.password);
    await user.save();
    return user;
}
async function bcryptHash(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
module.exports.login = login;
module.exports.createUser = createUser;

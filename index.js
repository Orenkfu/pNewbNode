const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Joi = require('joi');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const cors = require('./middleware/cors');
require('express-async-errors');
Joi.objectId = require('joi-objectid')(Joi);
require('./startup/config')();

mongoose.connect('mongodb://localhost/pNewb', console.log('Connected to mongodb..'));

const app = express();
const users = require('./controllers/users-controller');
const auth = require('./controllers/auth-controller');
const forums = require('./controllers/forum-controller');
const categories = require('./controllers/category-controller');
const posts = require('./controllers/post-controller');
const comments = require('./controllers/comment-controller');

app.use(express.json());
app.use(cors);
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/forums', forums)
app.use('/api/categories', categories)
app.use('/api/posts', posts);
app.use('/api/comments', comments);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`SERVER INITIATED: Listening on port ${port}`))


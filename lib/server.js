'use strict';

// == EXTERNAL RESOURCES ===============================================

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// == INTERNAL RESOURCES ===============================================

const errorHandler = require('./middleware/error.js');
const notFound = require('./middleware/404.js');
const authRouter = require('./routes/auth-router.js');
const bookRouter = require('./routes/book-router.js');
const app = express();

// == APPLICATION MIDDLEWARE ============================================

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// == ROUTES ===========================================================

// TODO Swagger Comment
/**
 * Homepage for the site
 * @route GET /
 * @returns {string} 200 - Homepage
 */
app.get('/', (req, res, next) => {
  res.send('Homepage');
});

// TODO Comment
// uses auth router middleware to authorize sign in and sign up
app.use(authRouter);

// TODO Comment
// uses book router middleware to get books data
app.use(bookRouter);

// TODO Comment
// uses error middleware for 404 page not found 
app.use(notFound);

// TODO Comment
// uses error middleware for 500 server 
app.use(errorHandler);

// == EXPORTS ===========================================================

module.exports = {
  server: app,

  start: port => {
    const PORT = port || process.env.PORT || 3000;

    // TODO Comment
    // starts the server on the port specified in the env file
    app.listen(PORT, () => {
      console.log(`Server Up on ${PORT}`);
    });

    // TODO: Comment
    // items need for mongoose
    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };

    const path = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/app';
    mongoose.connect(path, options);
  },
};

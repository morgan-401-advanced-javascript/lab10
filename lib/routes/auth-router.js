'use strict';

const express = require('express');
const router = express.Router();

const Users = require('../models/users-model.js');
const users = new Users();

// TODO JSDoc Comment
const create = async (req, res, next) => {
  let user = await users.create(req.body);
  req.user = user && user._id ? user : null;

  next();
};

// TODO JSDoc Comment
/**
 * @function authenticate This function takes in the user from the body calls the async function authenticate to compare the request body with our database
 * @param {object} req 
 * @param {object} res 
 * @param {function} next 
 */
const authenticate = async (req, res, next) => {
  let user = await users.authenticate(req.body);
  req.user = user && user._id ? user : null;

  next();
};

// TODO README Question
// Currently, the client is just sending us an object
// containing the username and password to us, which is
// why we can just pass along (req.body). What is a
// better way to do this?

const setToken = (req, res, next) => {
  if (req.user) {
    let token = req.user.generateToken();

    // TODO Comment
    // this sets the user token
    res.set('token', token);

    // TODO Comment
    // TODO README Question
    // What are the pros and cons of setting res.cookie?
    res.cookie('token', token);

    res.send('Successfully authenticated and logged in');
  } else res.send('Unable to authenticate and log in');
};

// TODO Swagger Comment
/**
 * @route POST /signup
 * @param {function} create
 * @param {function} setToken
 */
router.post('/signup', create, setToken);

// TODO Swagger Comment
/**
 * @route POST /signin
 * @param {function} authenticate
 * @param {function} setToken
 */
router.post('/signin', authenticate, setToken);

module.exports = router;

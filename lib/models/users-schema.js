'use strict';

// == EXTERNAL RESOURCES ===============================================

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// == DEFINE THE USER SCHEMA =============================================

// TODO Comment
// User schema that defines what is required and what type each value should be
const users = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['admin', 'editor', 'user'],
  },
});

// TODO JSDocs Comment
/** function that runs before saving password to database
 * @param  {string} password
 * 
 */
users.pre('save', async function() {
  // TODO README Question
  // What does .isModified do and why do we use it?
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// TODO JSDocs Comment
/**
 * function authenticate will compare username and password input
 * @param {object} cred user input name and password
 * @returns {error}
 * @returns {object} returns user from database
 */
// TODO Convert this function into using async/await
users.statics.authenticate = async function(creds) {
  let query = { username: creds.username };

  return await this.findOne(query)
    .then(user => user && user.comparePassword(creds.password))
    .catch(console.error);
};

// TODO JSDocs Comment
/** 
 * checks the user submitted password to the database
 * @param  {string} password user password to compare
 * @return {boolean} valid pasword or not
 */
// TODO Convert this function into using async/await
users.methods.comparePassword = function(password) {
  return bcrypt
    .compare(password, this.password)
    .then(valid => (valid ? this : null));
};

// TODO JSDocs Comment
/**
 * @param  {this._id};returnjwt.sign(tokenData} {lettokenData={id
 * @return  {} process.env.SECRET||'this-is-my-secret'
 * @return  {tokenData} jwt token
 */
users.methods.generateToken = function() {
  let tokenData = { id: this._id };
  return jwt.sign(tokenData, process.env.SECRET || 'this-is-my-secret');
};

module.exports = mongoose.model('users', users);

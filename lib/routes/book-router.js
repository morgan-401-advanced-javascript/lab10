'use strict';

const express = require('express');
const router = express.Router();
const Users = require('../models/users-model');
let user = new Users();

let books = [
  { title: 'Brave New World', auth: ['admin'] },
  { title: 'Hamlet', auth: ['admin', 'editor'] },
  { title: 'Alice in Wonderland', auth: ['admin', 'editor', 'user'] },
];

// TODO Swagger Comments
// TODO Edit code (see lab README)
/**
 * gets books from the database
 * @route GET '/books'
 * @returns {} 200 success
 * @returns {object} library: {
    count: number;
    results: {
        title: string;
        auth: string[];
    }[];
}
 * @returns {Error}  500 - Server error
 */
router.get('/books', async (req, res, next) => {
  let library = {
    count: books.length,
    results: books,
  };

  let login = await user.authenticate(req.body);
  
  if(!login) {
    res.status(403).send('Restricted. Please log in!');
  }


  res.status(200).json(library);
});

// TODO Swagger Comments
/**
 * gets specific book from database using id
 * @route GET '/books/:indx'
 * @returns {} 200 success
 * @returns {object} book:
 * @returns {Error}  500 - Server error
 */
// TODO Edit code (see lab README)
router.get('/books/:indx', async (req, res, next) => {

  let login = await user.authenticate(req.body);
  
  if(!login) {
    res.status(403).send('Restricted. Please log in!');
  }
  
  if (req.params.indx < books.length) {
    let book = books[req.params.indx];
    res.status(200).json(book);
  } else {
    res.send('Book not Found');
  }
});


module.exports = router;

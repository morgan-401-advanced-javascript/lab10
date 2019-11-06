# LAB - 10

### Morgan Shaw

### Links and Resources
* [submission PR](https://github.com/morgan-401-advanced-javascript/lab10/pull/1)
* [travis](https://travis-ci.com/morgan-401-advanced-javascript/lab10)
* [Heroku](https://lab10morgan.herokuapp.com/)


### Setup
#### `.env` requirements
* `MONGODB_URI = mongodb://127.0.0.1:27017/app`
* `PORT = 3000`
* `JWT_SECRET = 3a91d829ee92d91c03f94453af275b2a`

#### Running the app
* `npm start`

  
#### Tests
* How do you run tests?
npm test
* What assertions were made?
* What assertions need to be / should be made?
#### Questions
* What are the pros and cons of setting res.cookie?
 They can only be created and viewed by the website operator
* Currently, the client is just sending us an object containing the username and password to us, which is why we can just pass along (req.body). What is a better way to do this?
hash encryption

#### UML
Link to an image of the UML for your application and response to events
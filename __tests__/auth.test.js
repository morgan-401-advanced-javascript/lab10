'use strict';

const server = require('../lib/server.js').server;
const supertester = require('./supertester.js');
const Users = require('../lib/models/users-model.js');
const mockRequest = supertester.server(server);

// === Mock Database Setup ============================================

// This portion of your test code is here to set up your
// mock database with some initial entries. Remember, when you
// test servers and databases, you don't want to actually change
// anything in your database. So, supertester creates a mock
// database that only exists during the run of npm test on this
// file. The below code adds some entries to the mock database
// before all the tests run, and then closes the database
// after all the tests complete.

let userData = {
  admin: { username: 'sarah', password: 'sarahpassword', role: 'admin' },
  editor: { username: 'bill', password: 'billpassword', role: 'editor' },
  user: { username: 'rene', password: 'renepassword', role: 'user' },
};

let users = new Users();

beforeAll(async done => {
  await supertester.startDB();
  const adminUser = await users.create(userData.admin);
  const editorUser = await users.create(userData.editor);
  const userUser = await users.create(userData.user);
  done();
});

afterAll(supertester.stopDB);

// === End Mock Database Setup ========================================

// === Your Test Code =================================================
describe('Authenticating a user', () => {
  it('successully creates a new user', async () => {
    let newUser = await mockRequest
      .post('/signup')
      .send({ username: 'test', password: 'testpassword', role: 'admin'});

    expect(newUser.status).toBe(200);
    expect(newUser).toBeDefined();
  });

  it('can successfully sign in as bill', async () => {
    let res = await mockRequest
      .post('/signin')
      .send({ username: 'sarah', password: 'sarahpassword'});
      
    expect(res).toBeDefined();
  }); 
}); 
/* describe('test', () => {
  it('does something', () => {
    
  }); 
}); */

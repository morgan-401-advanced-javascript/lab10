'use strict';

const Model = require('./model.js');
const schema = require('./users-schema.js');

class Users extends Model {
  constructor() {
    super(schema);
  }

  // TODO JSDocs Comment
  /**
   * @function authenticate
   * @param  {} creds 
   * @returns 
   */
  authenticate(creds) {
    return this.schema.authenticate(creds);
  }
}

module.exports = Users;

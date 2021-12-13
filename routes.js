const UserController = require('./src/controllers/UserController');

module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: UserController.listUsers
  },
];
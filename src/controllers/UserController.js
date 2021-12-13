//* Importando dados mockados
const users = require('../mocks/users');

//* Criando módulo
module.exports = {
  listUsers(request, response) {
    const { order } = request.query
    const sortedUsers = users.sort((a, b) => {
      if (order === 'desc') {
        return a.id < b.id ? 1 : -1;
      }

      return a.id > b.id ? 1 : -1;
    })

    //* Retornando response e dados utilizando o método send
    response.send(200, sortedUsers)
  },

  getUserById(request, response) {
    const { id } = request.params;

    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      response.send(400, { error: 'User not found'});
    } 

    response.send(200, user)
  },


  createUser(request, response) {
    let body = '';
    //* Criando EventListener para adição de dados
    request.on('data', (chunk) => {
      body += chunk
    })

    request.on('end', () => {
      body = JSON.parse(body);

      const lastUserId= users[users.length - 1].id;
      const newUser = {
        id: lastUserId + 1,
        name: body.name
      }

      users.push(newUser);

      response.send(200, body)
    })

  },
}
//* Importando dados mockados
const users = require('../mocks/users');

//* Criando módulo
module.exports = {
  listUsers(req, res) {
    //* Retornando response
    res.writeHead(200, { 'Content-Type': 'application/json' });
    //* Retornando os dados
    res.end(JSON.stringify(users));
  }
}
//* Importando o módulo
const http = require('http');
const routes = require('../routes');

//* Criando o servidor
const server = http.createServer((req, res) => {
  //* Imprimindo method e url
  console.log(`Request method: ${req.method} | Endpoint: ${req.url}`);

  const route = routes.find((routeObj) => (
    routeObj.endpoint === req.url && routeObj.method === req.method
  ));

  if (route) {
    route.handler(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(`Cannot ${req.method} ${req.url}`)
  }
 
})

//* Rodando o servidor
server.listen(3000, () => console.log('🚀 Server started at http://localhost:3000'));
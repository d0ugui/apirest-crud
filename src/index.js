//* Importando o módulo
const http = require('http');
const { URL } = require('url');

const routes = require('../routes');

//* Criando o servidor
const server = http.createServer((request, response) => {
  //* Retornando um objeto com as propriedades da URL
  const parsedUrl = new URL(`http://localhost:3000${request.url}`);

  //* Imprimindo method e url
  console.log(`Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`);

  let { pathname } = parsedUrl;
  let id = null;

  const splitEndpoint = pathname.split('/').filter(Boolean);

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }

  const route = routes.find((routeObj) => (
    routeObj.endpoint === pathname && routeObj.method === request.method
  ));

  if (route) {
    //* Convertendo retorno Iterable para um Objeto
    request.query = Object.fromEntries(parsedUrl.searchParams);
    request.params = { id };

    //* Injetando props no response
    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(body));
    }

    route.handler(request, response);
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`)
  }
 
})

//* Rodando o servidor
server.listen(3000, () => console.log('🚀 Server started at http://localhost:3000'));
const http = require('http');
const hostname = '127.0.0.1'; //localhost
const port = 3000; //Porta de aplicação

const server = http.createServer((req, res) => {
    res.statusCode = 200; //status retornado indicando sucesso
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello World</h1>'); //texto html
});

server.listen(port, hostname, () => {
    console.log('Server running at http:${hostname}:${port}/');
});
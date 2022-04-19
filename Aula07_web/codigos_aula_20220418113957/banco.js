var express = require('express');
var http = require('http');
// Precisa ser importado
var bodyParser = require('body-parser');
var path = require("path");
// Adiciona o sqlite 3
var sqlite3 = require('sqlite3').verbose();
var app = express();
// Criar server
var server = http.createServer(app);

// Banco de dados aqui
var db = new sqlite3.Database('./database/Empresa.db');

app.use(bodyParser.urlencoded({extended: false}));

// GET para o formulário (mandamos o form para o usuário)
app.get('/busca', function(req, res) {
    res.sendFile(path.join(__dirname,'./busca.html'));
});

app.get('/insercao', function(req, res) {
    res.sendFile(path.join(__dirname,'./inserir.html'));
});

// Operação de inserir no banco de dados
var query_inserir = 'INSERT INTO Funcionario (id, nome, idade, endereco) VALUES (?, ?, ?, ?)';

// Aqui temos um post
app.post('/add', function(req, res) {
    db.serialize(() => {
        db.run( query_inserir,
            [req.body.id, req.body.nome, req.body.idade, req.body.endereco],
            function(err) {
                if (err) {
                    return console.log(err.message);
                }
                console.log("Novo funcionário adicionado com sucesso");
                // Se tudo der certo, veremos isso
                res.send("Novo funcionário com Id = " + req.body.id
                        + " e nome = " + req.body.nome
                        + " foi adicionado com sucesso.");
            }
        );
    });
});

// Operação de procurar no banco de dados
// * indica todas as colunas
var query_busca = "SELECT * FROM Funcionario WHERE id = ?;"
app.post('/ver', function(req, res) {
    db.serialize(() => {
        db.each(query_busca, [req.body.id],
        function(err, row) { // err é o erro, row é a linha consultada no banco
            if (err) {
                req.send("Erro ao encontrar funcionário");
                return console.error(err.message);
            }
            res.send('<p>Id: ' + row.id + '</p>'+ 
                     '<p>Nome: ' + row.nome + '</p>'
            );
            console.log("Funcionário encontrado!");
        });
    });
});

// Aqui listamos todos os funcionários
// Sem WHERE, pegamos todos os itens
query_listar = "SELECT * FROM Funcionario;"
app.get('/funcionarios', function(req, res) {
    db.serialize(() => {
        // Não é um POST, portanto não há req.body.variavel
        db.all(query_listar, // Selecionamos todos os elementos
        function(err, rows) { // err é o erro, row é a linha consultada no banco
            if (err) {
                req.send("Erro ao encontrar funcionário");
                return console.error(err.message);
            }
            var resposta = '';
            // Aqui recebemos uma lista de funcionários (rows) e iteramos sobre ela
            for (var funcionario of rows) {
                // preciso concatenar todas as informações do usuário na mesma variável
                resposta += '<p>Id: ' + funcionario.id + '</p>' +
                            '<p>Nome: ' + funcionario.nome + '</p><hr>';
            }
            // No final, devolvemos a resposta com todas as informações dos usuários
            res.send(resposta);
            console.log("Funcionários listados com sucesso");
        });
    });
});

server.listen(3333, function(){
    console.log("Server listening on port: 3333");
});
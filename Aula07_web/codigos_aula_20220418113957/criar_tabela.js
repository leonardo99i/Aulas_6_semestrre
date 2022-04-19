var sqlite3 = require('sqlite3').verbose();

// Criar banco
var db = new sqlite3.Database('./database/Empresa.db')
console.log("Banco criado com sucesso.")
db.run("CREATE TABLE IF NOT EXISTS Funcionario (" + 
        "id INT NOT NULL, " + 
        "nome VARCHAR(20) NOT NULL, " +
        "idade INT NOT NULL, " + 
        "endereco VARCHAR(25), " +
        "PRIMARY KEY (id) )"
);
console.log("Tabela criada com sucesso.")
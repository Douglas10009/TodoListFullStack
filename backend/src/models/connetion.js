// --
// Esse arquivo serve para configurar a conexão com um banco de dados
// -- 

const mysql = require('mysql2/promise');
require('dotenv').config();

// Para evitar hackeamento, iremos usar o env para recuperar os arquivos importantes
// em um arquivo só
const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
});

module.exports = connection;
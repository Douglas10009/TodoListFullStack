// --
// Esse arquivo serve para ...
// -- 

const express = require('express');
const cors = require('cors');
const router = require('./router');

const app = express();


// Para o express trabalhar com json
app.use(express.json());
// Para liberar o acesso para os clients
app.use(cors());
// Diz para o app que é pra usar sempre o router (Todas as rotas (/))
app.use(router);


module.exports = app;
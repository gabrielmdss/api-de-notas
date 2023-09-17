const express = require('express');
const routes = express();
const {criarUmaNota, listarNotas, recuperarNota, editarNota, excluirNota} = require('../controllers/controllers')

routes.post('/criarnota',criarUmaNota);

routes.get('/listarNotas',listarNotas);

routes.get('/recuperarNotas/:idNota', recuperarNota);

routes.put('/editarNota', editarNota);

routes.delete('/excluirNota/:idNota', excluirNota);

module.exports = routes;
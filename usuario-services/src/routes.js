const { Router } = require('express');
const UsuarioController = require('./controllers/UsuarioController');
const Usuario = require('./models/Usuario');
const Time = require('./models/Time');

const routes = Router();

routes.post('/usuarios', UsuarioController.addUser);
routes.post('/usuarios/:user_id', UsuarioController.findUser);
routes.delete('/usuarios/delete/:user_id', UsuarioController.deleteUser);

module.exports = routes;

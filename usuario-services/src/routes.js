const { Router } = require('express');
const UsuarioController = require('./controllers/UsuarioController');

const routes = Router();

routes.post('/usuarios', UsuarioController.addUser);
routes.post('/usuarios/:id', UsuarioController.findUser);
routes.delete('/usuarios/delete/:id', UsuarioController.deleteUser);

module.exports = routes;

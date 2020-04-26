const { Router } = require('express');
const UsuarioController = require('./controllers/UsuarioController');
const Validator = require('./validations');

const routes = Router();

routes.post(
   '/usuarios',
   Validator.validateRequiredNameBody,
   Validator.validateRequiredEmailBody,
   Validator.validateRequiredPasswordBody,
   UsuarioController.addUser
);
routes.post(
   '/usuarios/signin',
   Validator.validateRequiredEmailBody,
   Validator.validateRequiredPasswordBody,
   UsuarioController.signIn
);
routes.get('/usuarios/:id', UsuarioController.findUser);
routes.delete('/usuarios/delete/:id', UsuarioController.deleteUser);

module.exports = routes;

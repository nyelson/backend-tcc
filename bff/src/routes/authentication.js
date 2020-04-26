const { Router } = require('express');
const AuthenticationController = require('../controller/AuthenticationController');

const routes = Router();

routes.post('/signup', AuthenticationController.signUp);
routes.post('/signin', AuthenticationController.signIn);

module.exports = routes;

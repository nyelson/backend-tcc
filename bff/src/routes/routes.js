const { Router } = require('express');
const AuthenticationRoutes = require('./authentication');

const routes = Router();

routes.use('/authentication', AuthenticationRoutes);

module.exports = routes;

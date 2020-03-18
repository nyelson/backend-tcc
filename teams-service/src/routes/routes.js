const { Router } = require('express');

const TeamsRoutes = require('./teams');

const routes = Router();

routes.use('/times', TeamsRoutes);

module.exports = routes;

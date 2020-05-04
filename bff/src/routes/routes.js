const { Router } = require('express');
const AuthenticationRoutes = require('./authentication');
const ItemRoutes = require('./item');
const TeamRoutes = require('./team');
const authMiddleware = require('../middlewares/auth');

const routes = Router();

routes.use('/authentication', AuthenticationRoutes);
routes.use('/items', authMiddleware, ItemRoutes);
routes.use('/teams', authMiddleware, TeamRoutes);

module.exports = routes;

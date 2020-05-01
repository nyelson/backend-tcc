const { Router } = require('express');
const AuthenticationRoutes = require('./authentication');
const ItemRoutes = require('./item');
const authMiddleware = require('../middlewares/auth');

const routes = Router();

routes.use('/authentication', AuthenticationRoutes);
routes.use('/items', authMiddleware, ItemRoutes);

module.exports = routes;

const { Router } = require('express');
const userMiddleware = require('../middlewares/user');
const TeamController = require('../controller/TeamController');

const routes = Router();

routes.get(
   '/by-user',
   userMiddleware.findUserById,
   TeamController.findTeamsByUser
);

module.exports = routes;

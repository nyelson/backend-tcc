const { Router } = require('express');
const userMiddleware = require('../middlewares/user');
const ItemController = require('../controller/ItemController');

const routes = Router();

routes.get(
   '/by-user',
   userMiddleware.findUserById,
   ItemController.findItemsByUser
);

module.exports = routes;

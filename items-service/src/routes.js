const { Router } = require('express');
const ItemController = require('./controllers/ItemController');

const routes = Router();

routes.post('/items', ItemController.addItem);
routes.get('/items');
routes.get('/item/:id', ItemController.findItem);
routes.delete('/items/delete/:id', ItemController.deleteItem);

routes.get('/items/teams', ItemController.findItemByTeams);
routes.get('/items/team/:teamId', ItemController.findItemByTeam);

routes.get('/items/user/:userId', ItemController.findItemByUser);

module.exports = routes;

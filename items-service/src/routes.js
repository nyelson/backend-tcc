const { Router } = require('express');
const ItemController = require('./controllers/ItemController');

const routes = Router();

routes.post('/items', ItemController.addItem);
routes.post('/items/:id', ItemController.findItem);
routes.delete('/items/delete/:id', ItemController.deleteItem);

module.exports = routes;

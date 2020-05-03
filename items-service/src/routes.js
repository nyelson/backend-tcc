const { Router } = require('express');
const searchByTeamValidation = require('./middleware/search-by-teams-validation');
const paginationValidation = require('./middleware/pagination-validation');
const ItemController = require('./controllers/ItemController');

const routes = Router();

routes.post('/items', ItemController.addItem);
routes.get('/items');
routes.get('/item/:id', ItemController.findItem);
routes.delete('/items/delete/:id', ItemController.deleteItem);

routes.get(
   '/items/teams',
   searchByTeamValidation,
   paginationValidation.validatePaginationQueryParams,
   paginationValidation.validateSortingQueryParams,
   paginationValidation.validateFilterQueryParams,
   ItemController.findItemsByTeams
);

routes.get(
   '/items/teams/count',
   searchByTeamValidation,
   ItemController.findItemsByTeamsTotalRecords
);

routes.get('/items/team/:teamId', ItemController.findItemsByTeam);

routes.get('/items/user/:userId', ItemController.findItemsByUser);

module.exports = routes;

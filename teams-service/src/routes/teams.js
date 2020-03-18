const { Router } = require('express');
const Validators = require('./validations');
const TeamController = require('../controller/TimeController');

const routes = Router();

routes.post('/', Validators.validateRequiredNameBody, TeamController.addTeam);

routes.get(
   '/name/:name',
   Validators.validateRequiredName,
   TeamController.findTeamByName
);
routes.get('/:id', Validators.validateRequiredId, TeamController.findTeam);
routes.get('/', TeamController.findTeams);

routes.delete('/:id', Validators.validateRequiredId, TeamController.deleteTeam);

module.exports = routes;

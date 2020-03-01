const { Router } = require('express');
const Time = require('../models/Time');

const routes = Router();

const validateTeam = (request, response, next) => {
   const { nome } = request.body;

   if (!nome) {
      return response
         .status(400)
         .json({ erro: 'Campos obrigatórios não preenchidos' });
   }

   return next();
};

routes.post('/times', validateTeam, async (request, response) => {
   const { nome } = request.body;

   const time = await Time.create({
      nome,
   });

   return response.status(201).json(time);
});

module.exports = routes;

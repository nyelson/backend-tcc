const { Router } = require('express');
const Usuario = require('./models/Usuario');
// const Time = require('./models/Time');
// const Item = require('./models/Item');

const routes = Router();

routes.get('/users', (request, response) => {
   console.log(request.query);

   return response.json({
      message: 'Hello!',
   });
});

routes.delete('/users/:id', (request, response) => {
   console.log(request.params);

   return response.json({
      message: 'Hello!',
   });
});

routes.post('/usuarios', async (request, response) => {
   const { nome, cargo, tecnologias, times } = request.body;
   // const timesArray = times.split(',').map(time => time.Time());
   const tecnologiasArray = tecnologias
      .split(',')
      .map(tecnologia => tecnologia.trim());

   const usuario = await Usuario.create({
      nome,
      cargo,
      tecnologias: tecnologiasArray,
      times,
   });

   return response.json(usuario);
});

module.exports = routes;

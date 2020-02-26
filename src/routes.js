const { Router } = require('express');
const Usuario = require('./models/Usuario');
const Time = require('./models/Time');

const routes = Router();

routes.post('/usuarios', async (request, response) => {
   const { nome, cargo, tecnologias, times } = request.body;

   const tecnologiasArray = tecnologias
      .split(',')
      .map(tecnologia => tecnologia.trim());

   const usuario = await Usuario.create({
      nome,
      cargo,
      tecnologias: tecnologiasArray,
   });

   times.forEach(async element => {
      const updateTimes = await Time.create({
         nome: element.nome,
      });

      await Time.updateOne(
         { id: updateTimes.id },
         { $addToSet: { usuarios: usuario.id } },
         () => {}
      );

      await Usuario.updateOne(
         { id: usuario.id },
         { $addToSet: { times: updateTimes.id } },
         () => {}
      );
   });

   return response.json(usuario);
});

module.exports = routes;

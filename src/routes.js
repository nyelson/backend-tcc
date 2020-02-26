const { Router } = require('express');
const Usuario = require('./models/Usuario');
const Time = require('./models/Time');

const routes = Router();

routes.get('/users', (request, response) => {
   console.log(request.query);

   return response.json({
      message: 'Test!',
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

      // TO-DO verificar existencia de time antes de adicionar na base
      const teste1 = await Time.updateOne(
         { id: updateTimes.id },
         { $addToSet: { usuarios: usuario.id } },
         res => {
            console.log(res);
         }
      );

      console.log(teste1);

      const teste2 = await Usuario.updateOne(
         { id: usuario.id },
         { $addToSet: { times: updateTimes.id } },
         res => {
            console.log(res);
         }
      );

      console.log(teste2);
   });

   return response.json(usuario);
});

module.exports = routes;

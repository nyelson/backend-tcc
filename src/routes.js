const { Router } = require('express');
const Usuario = require('./models/Usuario');
const Time = require('./models/Time');
const Item = require('./models/Item');
const mongoose = require('mongoose');

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

routes.post('/usuarios', async (request, response, {usuarioID, timeID}) => {
   const { nome, cargo, tecnologias, times } = request.body;

   const tecnologiasArray = tecnologias
      .split(',')
      .map(tecnologia => tecnologia.trim());

   let usuario = await Usuario.create({
      nome,
      cargo,
      tecnologias: tecnologiasArray,
   });

   times.forEach(async element => {
      let updateTimes = await Time.create(
         { 
            nome: element.nome,
         }
      )

      // TO-DO verificar existencia de time antes de adicionar na base
      let teste1 = await Time.updateOne({_id: updateTimes._id}, { "$addToSet": {usuarios : usuario._id} }, (res) => {
         console.log(res);
      });

      let teste2 = await Usuario.updateOne({_id: usuario._id}, { "$addToSet": {times : updateTimes._id} }, (res) => {
         console.log(res);
      });
   });

   return response.json(usuario);
});

module.exports = routes;

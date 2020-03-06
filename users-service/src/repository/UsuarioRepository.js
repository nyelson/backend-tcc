const Usuario = require('../models/Usuario');
const Time = require('../models/Time');

const RETORNO_SUCESSO = 1;
const RETORNO_ERRO = 2;
const RETORNO_ERRO_INESPERADO = 3;

module.exports = {
   async addUser(nome, cargo, tecnologias) {
      const tecnologiasArray = tecnologias
         .split(',')
         .map(tecnologia => tecnologia.trim());

      const usuario = await Usuario.create({
         nome,
         cargo,
         tecnologias: tecnologiasArray,
      });

      return usuario;
   },
   async findUserByName(name) {
      const usuario = await Usuario.find({ nome: name }, () => {});

      return usuario;
   },
   async findUserById(id) {
      return await Usuario.findById(id);
   },
   async findUserByTime(nomeTime) {
      const time = await Time.find({ nome: nomeTime });
      return await Usuario.find({ times: time.id });
   },
   async deleteUserById(id) {
      const usuario = Usuario.findById(id);

      if (!usuario)
         Usuario.deleteOne(
            {
               nome: usuario.nome,
            },
            err => {
               if (!err) return RETORNO_ERRO_INESPERADO;
               return RETORNO_SUCESSO;
            }
         );

      return RETORNO_ERRO;
   },
   async deleteUserByName(name) {
      const usuario = this.findUserByName(name);

      if (!usuario)
         Usuario.deleteOne(
            {
               nome: usuario.nome,
            },
            err => {
               if (!err) return RETORNO_ERRO_INESPERADO;
               return RETORNO_SUCESSO;
            }
         );

      return RETORNO_ERRO;
   },
};

const Usuario = require('../models/Usuario');
const Time = require('../models/Time');

const RETORNO_SUCESSO = 1;
const RETORNO_ERRO = 2;
const RETORNO_ERRO_INESPERADO = 3;

module.exports = {
   async addUser(nome, cargo, tecnologias) {
      const user = await Usuario.create({
         nome,
         cargo,
         tecnologias,
      });
      return user;
   },
   async findUserByName(name) {
      const user = await Usuario.find({ nome: name }, () => {});
      return user;
   },
   async findUserById(id) {
      const user = await Usuario.findById(id);
      return user;
   },
   async findUserByTime(nomeTime) {
      const time = await Time.find({ nome: nomeTime });
      const user = await Usuario.find({ times: time.id });
      return user;
   },
   async deleteUserById(id) {
      const usuario = Usuario.findById(id);

      if (usuario)
         Usuario.deleteOne(
            {
               id: usuario.id,
            },
            err => {
               if (err) return RETORNO_ERRO_INESPERADO;
               return RETORNO_SUCESSO;
            }
         );

      return RETORNO_ERRO;
   },
   async deleteUserByName(name) {
      const usuario = this.findUserByName(name);

      if (usuario)
         Usuario.deleteOne(
            {
               id: usuario.id,
            },
            err => {
               if (err) return RETORNO_ERRO_INESPERADO;
               return RETORNO_SUCESSO;
            }
         );

      return RETORNO_ERRO;
   },
};

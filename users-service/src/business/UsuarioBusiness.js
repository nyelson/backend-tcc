const UsuarioRepository = require('../repository/UsuarioRepository');

const RETORNO_SUCESSO = 1;

module.exports = {
   async validarUsuarioExistente(nome) {
      const usuario = await this.findUserByName(nome);

      return usuario.length > 0;
   },
   async addUser(nome, cargo, tecnologias) {
      return await UsuarioRepository.addUser(nome, cargo, tecnologias);
   },
   async findUserById(id) {
      return await UsuarioRepository.findUserById(id);
   },
   async findUserByName(name) {
      return await UsuarioRepository.findUserByName(name);
   },
   async findUserByTime(nomeTime) {
      return await UsuarioRepository.findUserByTime(nomeTime);
   },
   async deleteUserById(id) {
      return await UsuarioRepository.deleteUserById(id);
   },
   async deleteUserByName(name) {
      const retorno = await UsuarioRepository.deleteUserByName(name);

     return retorno !== RETORNO_SUCESSO;
   },
};

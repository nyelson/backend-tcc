const UsuarioRepository = require('../repository/UsuarioRepository');

const RETORNO_SUCESSO = 1;

module.exports = {
   async validarUsuarioExistente(nome) {
      const usuario = await this.findUserByName(nome);

      return usuario.length > 0;
   },
   async addUser(nome, cargo, tecnologias) {
      const user = await UsuarioRepository.addUser(nome, cargo, tecnologias);
      return user;
   },
   async findUserById(id) {
      const user = await UsuarioRepository.findUserById(id);
      return user;
   },
   async findUserByName(name) {
      const user = await UsuarioRepository.findUserByName(name);
      return user;
   },
   async findUserByTime(nomeTime) {
      const user = await UsuarioRepository.findUserByTime(nomeTime);
      return user;
   },
   async deleteUserById(id) {
      const retorno = await UsuarioRepository.deleteUserById(id);
      
      return retorno !== RETORNO_SUCESSO;
   },
   async deleteUserByName(name) {
      const retorno = await UsuarioRepository.deleteUserByName(name);

      return retorno !== RETORNO_SUCESSO;
   },
};

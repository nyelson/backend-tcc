const UsuarioRepository = require('../repository/UsuarioRepository');

const RETORNO_SUCESSO = 1;

module.exports = {
   async validarUsuarioExistente(nome) {
      const usuario = await this.findUserByName(nome);

      if (usuario.length > 0) return true;

      return false;
   },
   async addUser(nome, cargo, tecnologias) {
      const usuario = await UsuarioRepository.addUser(nome, cargo, tecnologias);

      return usuario;
   },
   async findUserById(id) {
      const usuario = await UsuarioRepository.findUserById(id);

      return usuario;
   },
   async findUserByName(name) {
      const usuario = await UsuarioRepository.findUserByName(name);

      return usuario;
   },
   async findUserByTime(nomeTime) {
      const usuario = await UsuarioRepository.findUserByTime(nomeTime);

      return usuario;
   },
   async deleteUserById(id) {
      const retorno = await UsuarioRepository.deleteUserById(id);

      return retorno;
   },
   async deleteUserByName(name) {
      const retorno = await UsuarioRepository.deleteUserByName(name);

      if (retorno !== RETORNO_SUCESSO) return true;

      return false;
   },
};

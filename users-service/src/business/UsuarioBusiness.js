const UsuarioRepository = require('../repository/UsuarioRepository');

module.exports = {
   async validarUsuarioExistente(email) {
      const usuario = await this.findUserByEmail(email);

      return usuario != null;
   },
   async addUser(nome, email, password, cargo, tecnologias) {
      const user = await UsuarioRepository.addUser(
         nome,
         email,
         password,
         cargo,
         tecnologias
      );
      return user;
   },
   async findUserById(id) {
      const user = await UsuarioRepository.findUserById(id);
      return user;
   },
   async findUserByEmail(email) {
      const user = await UsuarioRepository.findUserByEmail(email);
      return user;
   },
   async findUserCredentials(email) {
      const user = await UsuarioRepository.findUserCredentials(email);
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
      return retorno;
   },
};

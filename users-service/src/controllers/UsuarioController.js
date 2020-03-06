const UsuarioBusiness = require('../business/UsuarioBusiness');

module.exports = {
   async findUser(request, response) {
      const { id } = request.headers;

      const usuario = await UsuarioBusiness.findUserById(id);

      if (!usuario) return response.status(200).json(usuario);
      return response.status(404).json({ error: 'Usuario não existe' });
   },
   async addUser(request, response) {
      const { nome, cargo, tecnologias } = request.body;

      let usuario = await UsuarioBusiness.validarUsuarioExistente(nome);

      if (!usuario)
         usuario = await UsuarioBusiness.addUser(nome, cargo, tecnologias);
      else
         return response
            .status(400)
            .json({ error: 'Usuario já existente na base de dados' });

      return response.status(200).json(usuario);
   },
   async deleteUser(request, response) {
      const { id } = request.headers;

      const retorno = await UsuarioBusiness.deleteUserById(id);

      if (retorno)
         return response
            .status(200)
            .json({ error: 'Usuario deletado com sucesso!' });

      return response.status(400).json({ error: 'Usuario não existe' });
   },
};

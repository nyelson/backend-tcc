const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsuarioBusiness = require('../business/UsuarioBusiness');

module.exports = {
   async findUser(request, response) {
      const { id } = request.headers;

      const usuario = await UsuarioBusiness.findUserById(id);

      if (usuario) return response.status(200).json(usuario);
      return response.status(404).json({ error: 'Usuario não existe' });
   },
   async addUser(request, response) {
      const { nome, email, password, cargo, tecnologias } = request.body;

      const usuarioExiste = await UsuarioBusiness.validarUsuarioExistente(nome);

      if (!usuarioExiste) {
         const createdUser = await UsuarioBusiness.addUser(
            nome,
            email,
            password,
            cargo,
            tecnologias
         );

         const returnUser = {
            nome: createdUser.nome,
            email: createdUser.email,
            cargo: createdUser.cargo,
            tecnologias: createdUser.tecnologias,
         };

         return response.status(201).json(returnUser);
      }
      return response
         .status(304)
         .json({ error: 'Usuario já existente na base de dados' });
   },
   async signIn(request, response) {
      const { email, password } = request.body;
      const errorMsg = 'Credenciais incorretas';

      const user = await UsuarioBusiness.findUserCredentials(email);

      if (!user) return response.status(404).json({ erro: errorMsg });

      if (!(await bcrypt.compare(password, user.password)))
         return response.status(404).json({ erro: errorMsg });

      const token = jwt.sign(
         { id: user._id, times: user.times },
         'PRIVATE_KEY',
         { expiresIn: 86400 }
      );

      const returnUser = {
         id: user.id,
         times: user.times,
         nome: user.nome,
         email: user.email,
         cargo: user.cargo,
         tecnologias: user.tecnologias,
      };

      return response.status(200).json({ usuario: returnUser, token });
   },
   async deleteUser(request, response) {
      const { id } = request.headers;

      const usuario = await UsuarioBusiness.findUserById(id);

      if (!usuario)
         return response.status(404).json({ error: 'Usuario não existe' });

      const retorno = await UsuarioBusiness.deleteUserById(id);

      if (retorno)
         return response
            .status(204)
            .json({ error: 'Usuario deletado com sucesso!' });

      return response
         .status(500)
         .json({ error: 'Nenhum usuario foi deletado' });
   },
};

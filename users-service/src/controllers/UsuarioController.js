const Usuario = require('../models/Usuario');

module.exports = {
   async findUser(request, response) {
      const { id } = request.headers;

      const usuario = await Usuario.findById(id);

      try {
         if (!usuario) return response.status(200).json(usuario);
         return response.status(400).json({ error: 'Usuario não existe' });
      } catch (error) {
         return response.status(400).json({ error: 'Usuario não existe' });
      }
   },
   async addUser(request, response) {
      const { nome, cargo, tecnologias } = request.body;

      const tecnologiasArray = tecnologias
         .split(',')
         .map(tecnologia => tecnologia.trim());

      const usuario = await Usuario.create({
         nome,
         cargo,
         tecnologias: tecnologiasArray,
      });

      return response.status(200).json(usuario);
   },
   async deleteUser(request, response) {
      const { id } = request.headers;

      const usuario = await Usuario.findById(id);

      try {
         if (!usuario) Usuario.delete(usuario);

         return response
            .status(200)
            .json({ error: 'Usuario deletado com sucesso!' });
      } catch (error) {
         return response.status(400).json({ error: 'Usuario não existe' });
      }
   },
};

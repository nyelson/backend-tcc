const ItemBusiness = require('../business/ItemBusiness');

module.exports = {
   async findItem(request, response) {
      const { id } = request.params;

      const item = await ItemBusiness.findItemById(id);

      if (item) return response.status(200).json(item);
      return response.status(404).json({ error: 'Item não existe' });
   },

   async findItemByTeams(request, response) {
      if (!(request.query && request.query.teamsIds))
         return response
            .status(400)
            .json({ erro: 'Parametros obrigatórios não preenchidos' });

      const { teamsIds: query } = request.query;

      const teamsIds = Array.isArray(query) ? query : [query];

      const items = await ItemBusiness.findItemByTeams(teamsIds);

      if (items) return response.status(200).json(items);
      return response.status(404).json({ error: 'Item não existe' });
   },

   async findItemByTeam(request, response) {
      const { teamId } = request.params;

      const items = await ItemBusiness.findItemByTeam(teamId);

      if (items) return response.status(200).json(items);
      return response.status(404).json({ error: 'Item não existe' });
   },

   async findItemByUser(request, response) {
      const { userId } = request.params;

      const items = await ItemBusiness.findItemByUser(userId);

      if (items) return response.status(200).json(items);
      return response.status(404).json({ error: 'Item não existe' });
   },
   async addItem(request, response) {
      const {
         titulo,
         descricao,
         prioridade,
         dificuldade,
         timeResponsavel,
         usuarioDesignado,
      } = request.body;

      const itemExiste = await ItemBusiness.validarItemExistente(titulo);

      if (!itemExiste) {
         const item = await ItemBusiness.addItem(
            titulo,
            descricao,
            prioridade,
            dificuldade,
            timeResponsavel,
            usuarioDesignado
         );
         return response.status(201).json(item);
      }
      return response
         .status(304)
         .json({ error: 'Item já existente na base de dados' });
   },
   async deleteItem(request, response) {
      const { id } = request.headers;

      const item = await ItemBusiness.findItemById(id);

      if (!item) return response.status(404).json({ erro: 'Item não existe' });

      const retorno = await ItemBusiness.deleteItemById(id);

      if (retorno)
         return response
            .status(204)
            .json({ error: 'Item deletado com sucesso!' });

      return response.status(500).json({ error: 'Nenhum item foi deletado' });
   },
};

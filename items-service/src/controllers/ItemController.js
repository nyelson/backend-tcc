const ItemBusiness = require('../business/ItemBusiness');

const fetchCustomFilterParams = query => {
   const sort = {};
   const customFilter = {};

   ({ sortBy: sort.by, sortOrder: sort.order } = query);
   sort.order = parseInt(sort.order, 10);
   ({
      titulo: customFilter.titulo,
      descricao: customFilter.descricao,
      timeResponsavel: customFilter.timeResponsavel,
      usuarioDesignado: customFilter.usuarioDesignado,
      prioridade: customFilter.prioridade,
      dificuldade: customFilter.dificuldade,
      status: customFilter.status,
      dataCriacao: customFilter.dataCriacao,
      dataFinalizacao: customFilter.dataFinalizacao,
   } = query);

   return { sort, customFilter };
};

module.exports = {
   async findItem(request, response) {
      const { id } = request.params;

      const item = await ItemBusiness.findItemById(id);

      if (item) return response.status(200).json(item);
      return response.status(404).json({ error: 'Item não existe' });
   },

   async findItemsByTeams(request, response) {
      const { teamsIds: query, page, itemsPerPage } = request.query;
      const teamsIds = Array.isArray(query) ? query : [query];

      const { sort, customFilter } = fetchCustomFilterParams(request.query);

      if (page != null && itemsPerPage != null) {
         const items = await ItemBusiness.findItemsByTeamsPaginated(
            teamsIds,
            parseInt(page, 10),
            parseInt(itemsPerPage, 10),
            sort,
            customFilter
         );
         return response.status(200).json(items);
      }

      const items = await ItemBusiness.findItemsByTeams(teamsIds);
      return response.status(200).json(items);
   },

   async findItemsByTeamsTotalRecords(request, response) {
      const { teamsIds: query } = request.query;

      const teamsIds = Array.isArray(query) ? query : [query];
      const { customFilter } = fetchCustomFilterParams(request.query);

      const totalRecords = await ItemBusiness.findItemsByTeamsTotalRecords(
         teamsIds,
         customFilter
      );
      return response.status(200).json({ totalRecords });
   },

   async findItemsByTeam(request, response) {
      const { teamId } = request.params;

      const items = await ItemBusiness.findItemsByTeam(teamId);

      return response.status(200).json(items);
   },

   async findItemsByUser(request, response) {
      const { userId } = request.params;

      const items = await ItemBusiness.findItemsByUser(userId);

      return response.status(200).json(items);
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

      if (retorno) return response.status(204).send();

      return response.status(500).json({ error: 'Nenhum item foi deletado' });
   },

   async setUser(request, response) {
      const { id } = request.params;
      const { userId } = request.body;

      const retorno = await ItemBusiness.setUser(id, userId);

      if (retorno) return response.status(204).send();
      return response
         .status(500)
         .json({ error: 'Não foi possível atualizar item' });
   },
};

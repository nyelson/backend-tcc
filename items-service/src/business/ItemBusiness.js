const ItemRepository = require('../repository/ItemRepository');

module.exports = {
   async validarItemExistente(titulo) {
      const item = await this.findItemByTitulo(titulo);

      return item != null;
   },
   async addItem(
      titulo,
      descricao,
      prioridade,
      dificuldade,
      timeResponsavel,
      usuarioDesignado
   ) {
      const item = await ItemRepository.addItem(
         titulo,
         descricao,
         prioridade,
         dificuldade,
         timeResponsavel,
         usuarioDesignado
      );
      return item;
   },
   async findItemById(id) {
      const item = await ItemRepository.findItemById(id);
      return item;
   },
   async findItemsByTeams(teamsIds) {
      const items = await ItemRepository.findItemsByTeams(teamsIds);
      return items;
   },

   async findItemsByTeamsTotalRecords(teamsIds, customFilter) {
      const hasCustomFilter =
         Object.values(customFilter).filter(val => val != null).length > 0;

      if (hasCustomFilter) {
         const totalRecords = await ItemRepository.findItemsByTeamsTotalRecordsCustomFilter(
            customFilter
         );
         return totalRecords;
      }

      const totalRecords = await ItemRepository.findItemsByTeamsTotalRecords(
         teamsIds
      );
      return totalRecords;
   },
   async findItemsByTeamsPaginated(
      teamsIds,
      page,
      itemsPerPage,
      sort,
      customFilter
   ) {
      const hasCustomFilter =
         Object.values(customFilter).filter(val => val != null).length > 0;
      if (hasCustomFilter) {
         const items = await ItemRepository.findItemsByCustomFilterPaginated(
            customFilter,
            page,
            itemsPerPage,
            sort
         );
         return items;
      }

      const items = await ItemRepository.findItemsByTeamsPaginated(
         teamsIds,
         page,
         itemsPerPage,
         sort
      );
      return items;
   },
   async findItemsByTeam(teamId) {
      const items = await ItemRepository.findItemsByTeam(teamId);
      return items;
   },
   async findItemsByUser(userId) {
      const items = await ItemRepository.findItemsByUser(userId);
      return items;
   },
   async findItemByTitulo(titulo) {
      const item = await ItemRepository.findItemByTitulo(titulo);
      return item;
   },
   async deleteItemById(id) {
      const retorno = await ItemRepository.deleteItemById(id);
      return retorno;
   },

   async setUser(id, userId) {
      const retorno = await ItemRepository.setUser(id, userId);
      return retorno;
   },
};

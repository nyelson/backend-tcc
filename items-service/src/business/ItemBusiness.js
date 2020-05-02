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
      const item = await ItemRepository.findItemsByTeams(teamsIds);
      return item;
   },

   async findItemsByTeamsTotalRecords(teamsIds) {
      const totalRecords = await ItemRepository.findItemsByTeamsTotalRecords(
         teamsIds
      );
      return totalRecords;
   },
   async findItemsByTeamsPaginated(teamsIds, page, itemsPerPage) {
      const item = await ItemRepository.findItemsByTeamsPaginated(
         teamsIds,
         page,
         itemsPerPage
      );
      return item;
   },
   async findItemsByTeam(teamId) {
      const item = await ItemRepository.findItemsByTeam(teamId);
      return item;
   },
   async findItemsByUser(userId) {
      const item = await ItemRepository.findItemsByUser(userId);
      return item;
   },
   async findItemByTitulo(titulo) {
      const item = await ItemRepository.findItemByTitulo(titulo);
      return item;
   },
   async deleteItemById(id) {
      const retorno = await ItemRepository.deleteItemById(id);
      return retorno;
   },
};

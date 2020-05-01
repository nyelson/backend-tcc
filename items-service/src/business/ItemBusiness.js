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
   async findItemByTeams(teamsIds) {
      const item = await ItemRepository.findItemByTeams(teamsIds);
      return item;
   },
   async findItemByTeam(teamId) {
      const item = await ItemRepository.findItemByTeam(teamId);
      return item;
   },
   async findItemByUser(userId) {
      const item = await ItemRepository.findItemByUser(userId);
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

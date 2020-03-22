const ItemRepository = require('../repository/ItemRepository');

module.exports = {
   async validarItemExistente(description) {
      const item = await this.findItemByDescription(description);

      return item != null;
   },
   async addItem(descricao, prioridade, dificuldade) {
      const item = await ItemRepository.addItem(
         descricao,
         prioridade,
         dificuldade
      );
      return item;
   },
   async findItemById(id) {
      const item = await ItemRepository.findItemById(id);
      return item;
   },
   async findItemByDescription(description) {
      const item = await ItemRepository.findItemByDescription(description);
      return item;
   },
   async findItemByUser(nomeUser) {
      const item = await ItemRepository.findItemByUser(nomeUser);
      return item;
   },
   async deleteItemById(id) {
      const retorno = await ItemRepository.deleteItemById(id);
      return retorno;
   },
};

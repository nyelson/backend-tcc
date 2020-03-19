const ItemRepository = require('../repository/ItemRepository');

const RETORNO_SUCESSO = 1;

module.exports = {
   async validarItemExistente(description) {
      const item = await this.findItemByDescription(description);

      return item.length > 0;
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

      return retorno !== RETORNO_SUCESSO;
   },
   async deleteItemByDescription(description) {
      const retorno = await ItemRepository.deleteItemByDescription(description);

      return retorno !== RETORNO_SUCESSO;
   },
};

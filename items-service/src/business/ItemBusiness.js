const ItemRepository = require('../repository/ItemRepository');

module.exports = {
   async validarItemExistente(titulo) {
      const item = await this.findItemByTitulo(titulo);

      return item != null;
   },
   async addItem(titulo, descricao, prioridade, dificuldade) {
      const item = await ItemRepository.addItem(
         titulo,
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
   async findItemByTitulo(titulo) {
      const item = await ItemRepository.findItemByTitulo(titulo);
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

const Usuario = require('../models/Usuario');
const Item = require('../models/Item');

module.exports = {
   async addItem(titulo, descricao, prioridade, dificuldade) {
      const item = await Item.create({
         descricao,
         prioridade,
         dificuldade,
         dataCadastro: Date.now(),
      });
      return item;
   },
   async findItemByTitulo(titulo) {
      const item = await Item.findOne({ titulo: titulo }, () => {});
      return item;
   },
   async findItemById(id) {
      const item = await Item.findById(id);
      return item;
   },
   async findItemByUser(nomeUser) {
      const user = await Usuario.findOne({ nome: nomeUser });
      if (!user) return null;
      const item = await Item.find({ usuarioDesignado: user.id });
      return item;
   },
   async deleteItemById(id) {
      const result = await Item.deleteOne({ _id: id });
      return result.deletedCount === 1;
   },
};
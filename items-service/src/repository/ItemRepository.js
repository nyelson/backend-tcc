const Usuario = require('../models/Usuario');
const Item = require('../models/Item');

const RETORNO_SUCESSO = 1;
const RETORNO_ERRO = 2;
const RETORNO_ERRO_INESPERADO = 3;

module.exports = {
   async addItem(descricao, prioridade, dificuldade) {
      const item = await Item.create({
         descricao,
         prioridade,
         dificuldade,
         dataCadastro: Date.now(),
      });
      return item;
   },
   async findItemByDescription(description) {
      const item = await Item.find({ descricao: description }, () => {});
      return item;
   },
   async findItemById(id) {
      const item = await Item.findById(id);
      return item;
   },
   async findItemByUser(nomeUser) {
      const user = await Usuario.findOne({ nome: nomeUser });
      if(!user) return new Array();
      const item = await Item.find({ usuarioDesignado: user.id });
      return item;
   },
   async deleteItemById(id) {
      const item = Item.findById(id);

      if (item)
         Item.deleteOne(
            {
               id: item.id,
            },
            err => {
               if (err) return RETORNO_ERRO_INESPERADO;
               return RETORNO_SUCESSO;
            }
         );

      return RETORNO_ERRO;
   },
   async deleteItemByDescription(description) {
      const item = this.findItemByDescription(description);

      if (item)
         Item.deleteOne(
            {
               id: item.id,
            },
            err => {
               if (err) return RETORNO_ERRO_INESPERADO;
               return RETORNO_SUCESSO;
            }
         );

      return RETORNO_ERRO;
   },
};

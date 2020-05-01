const mongoose = require('mongoose');
require('../models/Usuario');
require('../models/Time');
const Item = require('../models/Item');

module.exports = {
   async addItem(
      titulo,
      descricao,
      prioridade,
      dificuldade,
      timeResponsavel,
      usuarioDesignado
   ) {
      const item = await Item.create({
         titulo,
         descricao,
         prioridade,
         dificuldade,
         dataCadastro: Date.now(),
         timeResponsavel,
         usuarioDesignado,
      });
      return item;
   },
   async findItemByTitulo(titulo) {
      const item = await Item.findOne({ titulo }, () => {});
      return item;
   },
   async findItemById(id) {
      const item = await Item.findById(id)
         .populate({
            path: 'usuarioDesignado',
            select: 'nome email',
         })
         .populate({ path: 'timeResponsavel', select: 'nome' });
      return item;
   },
   async findItemByTeams(teamsIds) {
      const items = await Item.find({
         timeResponsavel: {
            $in: teamsIds
               .filter(teamId => mongoose.Types.ObjectId.isValid(teamId))
               .map(teamId => mongoose.Types.ObjectId(teamId)),
         },
      })
         .populate({
            path: 'usuarioDesignado',
            select: 'nome email',
         })
         .populate({ path: 'timeResponsavel', select: 'nome' });
      return items;
   },
   async findItemByTeam(teamId) {
      const items = await Item.find({
         timeResponsavel: mongoose.Types.ObjectId(teamId),
      })
         .populate({
            path: 'usuarioDesignado',
            select: 'nome email',
         })
         .populate({ path: 'timeResponsavel', select: 'nome' });
      return items;
   },
   async findItemByUser(userId) {
      const items = await Item.find({
         usuarioDesignado: mongoose.Types.ObjectId(userId),
      })
         .populate({
            path: 'usuarioDesignado',
            select: 'nome email',
         })
         .populate({ path: 'timeResponsavel', select: 'nome' });
      return items;
   },
   async deleteItemById(id) {
      const result = await Item.deleteOne({ _id: id });
      return result.deletedCount === 1;
   },
};

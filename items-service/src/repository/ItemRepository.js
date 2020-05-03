const mongoose = require('mongoose');
require('../models/Usuario');
require('../models/Time');
const Item = require('../models/Item');

const normalizeCustomFilter = customFilter => (acc, cur) => {
   if (customFilter[cur] == null) return acc;
   if (cur === 'titulo' || cur === 'descricao') {
      const regex = new RegExp(`^${customFilter[cur]}`, 'gi');
      acc[cur] = { $regex: regex };
      return acc;
   }

   if (cur === 'timeResponsavel' || cur === 'usuarioDesignado') {
      if (mongoose.Types.ObjectId.isValid(customFilter[cur]))
         acc[cur] = mongoose.Types.ObjectId(customFilter[cur]);
      return acc;
   }

   if (cur === 'prioridade' || cur === 'dificuldade') {
      acc[cur] = parseInt(customFilter[cur]);
      return acc;
   }

   acc[cur] = customFilter[cur];
   return acc;
};

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
   async findItemsByTeams(teamsIds) {
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
   async findItemsByTeamsTotalRecords(teamsIds) {
      const totalRecords = await Item.countDocuments({
         timeResponsavel: {
            $in: teamsIds
               .filter(teamId => mongoose.Types.ObjectId.isValid(teamId))
               .map(teamId => mongoose.Types.ObjectId(teamId)),
         },
      });

      return totalRecords;
   },
   async findItemsByTeamsPaginated(teamsIds, page, itemsPerPage, sort) {
      const query = [];
      const filterByTeamsIds = {
         $match: {
            timeResponsavel: {
               $in: teamsIds
                  .filter(teamId => mongoose.Types.ObjectId.isValid(teamId))
                  .map(teamId => mongoose.Types.ObjectId(teamId)),
            },
         },
      };

      const hasSort =
         Object.values(sort).filter(val => val != null).length === 2;
      if (hasSort) {
         query.push({ $sort: { [sort.by]: sort.order } });
      }

      query.push(filterByTeamsIds);

      const pagination = [
         { $skip: (page - 1) * itemsPerPage },
         { $limit: itemsPerPage },
      ];

      query.push(...pagination);

      const items = await Item.aggregate(query);
      await Item.populate(items, {
         path: 'usuarioDesignado',
         select: 'nome email',
      });
      await Item.populate(items, { path: 'timeResponsavel', select: 'nome' });
      return items;
   },

   async findItemsByCustomFilterPaginated(
      customFilter,
      page,
      itemsPerPage,
      sort
   ) {
      const query = [];

      const match = Object.keys(customFilter).reduce(
         normalizeCustomFilter(customFilter),
         {}
      );

      const hasSort =
         Object.values(sort).filter(val => val != null).length === 2;
      if (hasSort) {
         query.push({ $sort: { [sort.by]: sort.order } });
      }

      const filter = {
         $match: match,
      };

      query.push(filter);

      const pagination = [
         { $skip: (page - 1) * itemsPerPage },
         { $limit: itemsPerPage },
      ];

      query.push(...pagination);

      const items = await Item.aggregate(query);
      await Item.populate(items, {
         path: 'usuarioDesignado',
         select: 'nome email',
      });
      await Item.populate(items, { path: 'timeResponsavel', select: 'nome' });
      return items;
   },

   async findItemsByTeam(teamId) {
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
   async findItemsByUser(userId) {
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

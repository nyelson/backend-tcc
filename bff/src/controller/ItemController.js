const axios = require('axios');
const itemsLogic = require('../logic/item');

const fetchCustomFilterParams = (query) => {
   const sort = {};
   const customFilter = {};

   ({ sortBy: sort.by, sortOrder: sort.order } = query);
   sort.order = parseInt(sort.order, 10);
   ({
      titulo: customFilter.titulo,
      descricao: customFilter.descricao,
      timeResponsavel: customFilter.timeResponsavel,
      usuarioDesignado: customFilter.usuarioDesignado,
      prioridade: customFilter.prioridade,
      dificuldade: customFilter.dificuldade,
   } = query);

   return { sort, customFilter };
};

const fetchItems = (teams, sort, page, itemsPerPage) =>
   axios.get(
      `http://localhost:3331/items/teams?page=${page}&itemsPerPage=${itemsPerPage}&${
         sort.by != null ? `sortBy=${sort.by}&` : ''
      }${
         sort.order != null && !Number.isNaN(sort.order)
            ? `sortOrder=${sort.order}&`
            : ''
      }${teams.map((team) => `teamsIds=${team}`).join('&')}`
   );

const fetchItemsCustomFilter = (customFilter, sort, page, itemsPerPage) =>
   axios.get(
      `http://localhost:3331/items/teams?page=${page}&itemsPerPage=${itemsPerPage}&${
         sort.by != null ? `sortBy=${sort.by}&` : ''
      }${
         sort.order != null && !Number.isNaN(sort.order)
            ? `sortOrder=${sort.order}&`
            : ''
      }${Object.keys(customFilter)
         .filter((key) => customFilter[key] != null)
         .map((key) => `${key}=${customFilter[key]}`)
         .join('&')}`
   );

const fetchTotalRecords = (teams) =>
   axios.get(
      `http://localhost:3331/items/teams/count?${teams
         .map((team) => `teamsIds=${team}`)
         .join('&')}`
   );

const fetchTotalRecordsCustomFilter = (customFilter) =>
   axios.get(
      `http://localhost:3331/items/teams/count?${Object.keys(customFilter)
         .filter((key) => customFilter[key] != null)
         .map((key) => `${key}=${customFilter[key]}`)
         .join('&')}`
   );

const findItemsByUser = async (req, res) => {
   const { times: teams } = req.user;
   const { page, itemsPerPage } = req.query;

   const { sort, customFilter } = fetchCustomFilterParams(req.query);

   const hasCustomFilter =
      Object.values(customFilter).filter((val) => val != null).length > 0;

   const hasSort =
      Object.values(customFilter).filter(
         (val) => val != null && !Number.isNaN(val)
      ).length === 2;

   try {
      const [
         { data: items },
         {
            data: { totalRecords },
         },
      ] = await axios.all([
         hasCustomFilter || hasSort
            ? fetchItemsCustomFilter(customFilter, sort, page, itemsPerPage)
            : fetchItems(teams, sort, page, itemsPerPage),
         hasCustomFilter
            ? fetchTotalRecordsCustomFilter(customFilter)
            : fetchTotalRecords(teams),
      ]);

      const formatedItems = itemsLogic.formatItems(items);
      return res.status(200).json({ items: formatedItems, totalRecords });
   } catch (err) {
      if (err.response) {
         return res.status(err.response.status).json(err.response.data);
      }

      return res.status(500).json({ erro: 'Erro interno do servidor' });
   }
};

module.exports = { findItemsByUser };

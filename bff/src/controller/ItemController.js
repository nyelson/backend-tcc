const axios = require('axios');

const fetchItems = (teams, page, itemsPerPage) =>
   axios.get(
      `http://localhost:3331/items/teams?page=${page}&itemsPerPage=${itemsPerPage}&${teams
         .map((team) => `teamsIds=${team}`)
         .join('&')}`
   );

const fetchTotalRecords = (teams) =>
   axios.get(
      `http://localhost:3331/items/teams/count?${teams
         .map((team) => `teamsIds=${team}`)
         .join('&')}`
   );
const findItemsByUser = async (req, res) => {
   const { times: teams } = req.user;
   const { page, itemsPerPage } = req.query;

   try {
      const [
         { data: items },
         {
            data: { totalRecords },
         },
      ] = await axios.all([
         fetchItems(teams, page, itemsPerPage),
         fetchTotalRecords(teams),
      ]);

      return res.status(200).json({ items, totalRecords });
   } catch (err) {
      if (err.response) {
         return res.status(err.response.status).json(err.response.data);
      }

      return res.status(500).json({ erro: 'Erro interno do servidor' });
   }
};

module.exports = { findItemsByUser };

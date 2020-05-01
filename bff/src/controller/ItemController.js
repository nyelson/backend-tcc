const axios = require('axios');

const findItemsByUser = async (req, res) => {
   const { times: teams } = req.user;

   try {
      const resp = await axios.get(
         `http://localhost:3331/items/teams?${teams
            .map((team) => `teamsIds=${team}`)
            .join('&')}`
      );

      return res.status(resp.status).json(resp.data);
   } catch (err) {
      if (err.response) {
         return res.status(err.response.status).json(err.response.data);
      }

      return res.status(500).json({ erro: 'Erro interno do servidor' });
   }
};

module.exports = { findItemsByUser };

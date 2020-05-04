const axios = require('axios');

const findTeamsByUser = async (req, res) => {
   try {
      const resp = await axios.get(
         `http://localhost:3334/times/user/${req.userId}`
      );

      const teams = resp.data.times.map((team) => ({
         id: team._id,
         nome: team.nome,
      }));

      return res.status(resp.status).json(teams);
   } catch (err) {
      console.error(err);
      if (err.response) {
         return res.status(err.response.status).json(err.response.data);
      }

      return res.status(500).json({ erro: 'Erro interno do servidor' });
   }
};

module.exports = { findTeamsByUser };

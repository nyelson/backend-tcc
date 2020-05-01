const axios = require('axios');

const findUserById = async (req, res, next) => {
   try {
      const resp = await axios.get(
         `http://localhost:3333/usuarios/${req.userId}`
      );
      req.user = resp.data;
      return next();
   } catch (err) {
      if (err.response) {
         return res.status(err.response.status).json(err.response.data);
      }

      return res.status(500).json({ erro: 'Erro interno do servidor' });
   }
};

module.exports = { findUserById };

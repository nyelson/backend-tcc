const axios = require('axios');

const signUp = async (req, res) => {
   try {
      const resp = await axios.post('http://localhost:3333/usuarios', req.body);
      return res.status(resp.status).json(resp.data);
   } catch (err) {
      if (err.response) {
         return res.status(err.response.status).json(err.response.data);
      }

      return res.status(500).json({ erro: 'Erro interno do servidor' });
   }
};

const signIn = async (req, res) => {
   try {
      const resp = await axios.post(
         'http://localhost:3333/usuarios/signin',
         req.body
      );
      return res.status(resp.status).json(resp.data);
   } catch (err) {
      if (err.response) {
         return res.status(err.response.status).json(err.response.data);
      }

      return res.status(500).json({ erro: 'Erro interno do servidor' });
   }
};

module.exports = {
   signUp,
   signIn,
};

module.exports = async (request, response, next) => {
   if (!(request.query && request.query.teamsIds))
      return response
         .status(400)
         .json({ erro: 'Parametros obrigatórios não preenchidos' });

   return next();
};

const hasCustomFilter = query => {
   return (
      query.titulo ||
      query.timeResponsaveltitulo ||
      query.descricao ||
      query.timeResponsavel ||
      query.usuarioDesignado ||
      query.prioridade ||
      query.dificuldade
   );
};

module.exports = async (request, response, next) => {
   if (request.query && hasCustomFilter(request.query)) return next();
   if (!(request.query && request.query.teamsIds))
      return response
         .status(400)
         .json({ erro: 'Parametros obrigatórios não preenchidos' });

   return next();
};

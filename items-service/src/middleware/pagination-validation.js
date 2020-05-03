const validatePaginationQueryParams = async (request, response, next) => {
   const { page, itemsPerPage } = request.query;

   if (page == null && itemsPerPage == null) return next();

   const parsedItemsPerPage = parseInt(itemsPerPage, 10);
   const parsedPage = parseInt(page, 10);
   if (
      Number.isNaN(parsedPage) ||
      Number.isNaN(parsedItemsPerPage) ||
      parsedPage < 1 ||
      parsedItemsPerPage < 1
   )
      return response
         .status(400)
         .json({ erro: 'Parametros de paginação inválidos' });

   return next();
};

const validateSortingQueryParams = async (request, response, next) => {
   const { sortBy, sortOrder } = request.query;

   if (sortBy == null && sortOrder == null) return next();
   const parsedSortOrder = parseInt(sortOrder, 10);
   if (
      sortBy == null ||
      sortOrder == null ||
      Number.isNaN(parsedSortOrder) ||
      (parsedSortOrder != 1 && parsedSortOrder != -1)
   )
      return response
         .status(400)
         .json({ erro: 'Parametros de ordenação inválidos' });

   return next();
};

const validateFilterQueryParams = async (request, response, next) => {
   const {
      titulo,
      descricao,
      timeResponsavel,
      usuarioDesignado,
      prioridade,
      dificuldade,
   } = request.query;

   if (
      titulo == null &&
      descricao == null &&
      timeResponsavel == null &&
      usuarioDesignado == null &&
      prioridade == null &&
      dificuldade == null
   )
      return next();

   const errorMsg = 'Parametros de filtro inválidos';

   if (prioridade != null && Number.isNaN(parseInt(prioridade, 10)))
      return response.status(400).json({ erro: errorMsg });

   if (dificuldade != null && Number.isNaN(parseInt(dificuldade, 10)))
      return response.status(400).json({ erro: errorMsg });

   return next();
};

module.exports = {
   validatePaginationQueryParams,
   validateSortingQueryParams,
   validateFilterQueryParams,
};

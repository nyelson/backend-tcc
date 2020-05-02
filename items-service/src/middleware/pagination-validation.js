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

module.exports = { validatePaginationQueryParams };

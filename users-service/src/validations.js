const mongoose = require('mongoose');

const validateRequiredId = (request, response, next) => {
   const { id } = request.params;

   if (!id) {
      return response
         .status(400)
         .json({ erro: 'Campos obrigatórios não preenchidos' });
   }

   if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ erro: 'Id inválido' });
   }

   return next();
};

const validateRequiredName = (request, response, next) => {
   const { name } = request.params;

   if (!name) return response.status(400).json({ erro: 'Nome é obrigatório' });

   return next();
};

const validateRequiredNameBody = (request, response, next) => {
   const { nome } = request.body;

   if (!nome) {
      return response
         .status(400)
         .json({ erro: 'Campos obrigatórios não preenchidos' });
   }

   return next();
};

const validateRequiredEmailBody = (request, response, next) => {
   const { email } = request.body;

   if (!email) {
      return response
         .status(400)
         .json({ erro: 'Campos obrigatórios não preenchidos' });
   }

   return next();
};

const validateRequiredPasswordBody = (request, response, next) => {
   const { password } = request.body;

   if (!password) {
      return response
         .status(400)
         .json({ erro: 'Campos obrigatórios não preenchidos' });
   }

   return next();
};

module.exports = {
   validateRequiredId,
   validateRequiredName,
   validateRequiredNameBody,
   validateRequiredEmailBody,
   validateRequiredPasswordBody,
};

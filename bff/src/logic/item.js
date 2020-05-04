const niveis = {
   1: 'Baixa',
   2: 'Média',
   3: 'Alta',
};

const status = {
   1: 'Aberto',
   2: 'Em desenvolvimento',
   3: 'Em testes',
   4: 'Fechado',
};

const formatDateToString = (date) =>
   `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString()
      .padStart(
         2,
         '0'
      )}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

const getPropertyOrDefaultValue = (entity, property, defaultValue) =>
   entity != null ? entity[property] : defaultValue;

const formatItems = (items) => {
   return items.map((item) => {
      const creationDate = new Date(item.dataCadastro);
      return {
         id: item._id,
         titulo: item.titulo,
         descricao: item.descricao,
         prioridade: niveis[item.prioridade],
         dificuldade: niveis[item.dificuldade],
         status: status[item.status],
         dataCadastro: formatDateToString(creationDate),
         usuarioDesignado: getPropertyOrDefaultValue(
            item.usuarioDesignado,
            'nome',
            '-'
         ),
         timeResponsavel: getPropertyOrDefaultValue(
            item.timeResponsavel,
            'nome',
            '-'
         ),
      };
   });
};

module.exports = { formatItems };

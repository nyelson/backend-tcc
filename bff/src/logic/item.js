const niveis = {
   1: 'Baixa',
   2: 'Média',
   3: 'Alta',
};

const formatDateToString = (date) =>
   `${date.getDate()}/${(date.getMonth() + 1)
      .toString()
      .padStart(
         2,
         '0'
      )}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

const getPropertyOrDefaultValue = (entity, property, defaultValue) =>
   entity != null ? entity[property] : defaultValue;

const formatItems = (items) => {
   return items.map((item) => {
      const date = new Date(item.dataCadastro);
      item.usuarioDesignado = getPropertyOrDefaultValue(
         item.usuarioDesignado,
         'nome',
         '-'
      );
      item.dificuldade = niveis[item.dificuldade];
      item.prioridade = niveis[item.prioridade];
      item.timeResponsavel = getPropertyOrDefaultValue(
         item.timeResponsavel,
         'nome',
         '-'
      );
      item.dataCadastro = formatDateToString(date);
      return item;
   });
};

module.exports = { formatItems };

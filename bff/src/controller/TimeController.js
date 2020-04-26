const TeamBusiness = require('../business/TeamBusiness');

const findTeams = async (_request, response) => {
   const teams = await TeamBusiness.findTeams();
   return response.status(200).json({ times: teams });
};

const findTeam = async (request, response) => {
   const { id } = request.params;

   const team = await TeamBusiness.findTeamById(id);

   if (team) return response.status(200).json(team);
   return response.status(404).json({ erro: 'Time não existe' });
};

const findTeamByName = async (request, response) => {
   const { name: nome } = request.params;
   const team = await TeamBusiness.findTeamByName(nome);

   if (team) return response.status(200).json(team);
   return response.status(404).json({ erro: 'Time não existe' });
};

const addTeam = async (request, response) => {
   const { nome } = request.body;

   if (!(await TeamBusiness.teamAlreadyExists(nome))) {
      const team = await TeamBusiness.addTeam(nome);
      return response.status(201).json(team);
   }

   return response
      .status(304)
      .json({ erro: 'Time com esse nome já existente na base de dados' });
};

const deleteTeam = async (request, response) => {
   const { id } = request.params;

   const team = await TeamBusiness.findTeamById(id);

   if (!team) return response.status(404).json({ erro: 'Time não existe' });

   const teamWasDeleted = await TeamBusiness.deleteTeam(id);

   if (teamWasDeleted) return response.status(204).json();

   return response.status(500).json({ erro: 'Nenhum time foi deletado' });
};

module.exports = {
   findTeams,
   findTeam,
   findTeamByName,
   addTeam,
   deleteTeam,
};

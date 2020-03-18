const TeamRepository = require('../repository/TeamRepository');

const teamAlreadyExists = async nome => {
   const team = await TeamRepository.findTeamByName(nome);

   return team != null;
};
const addTeam = async nome => {
   const team = await TeamRepository.addTeam(nome);
   return team;
};

const findTeams = async () => {
   const teams = await TeamRepository.findTeams();
   return teams;
};

const findTeamById = async id => {
   const team = await TeamRepository.findTeamById(id);
   return team;
};
const findTeamByName = async name => {
   const team = await TeamRepository.findTeamByName(name);
   return team;
};
const deleteTeam = async id => {
   const result = await TeamRepository.deleteTeam(id);
   return result;
};

module.exports = {
   teamAlreadyExists,
   addTeam,
   findTeams,
   findTeamById,
   findTeamByName,
   deleteTeam,
};

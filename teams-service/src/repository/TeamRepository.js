const Team = require('../models/Team');

const addTeam = async nome => {
   const team = await Team.create({ nome });
   return team;
};

const findTeams = async () => {
   const teams = await Team.find();
   return teams;
};

const findTeamByName = async name => {
   const team = await Team.findOne({ nome: name }, () => {});
   return team;
};

const findTeamById = async id => {
   const team = await Team.findById(id);
   return team;
};

const deleteTeam = async id => {
   const result = await Team.deleteOne({ _id: id });
   return result.deletedCount === 1;
};

module.exports = {
   addTeam,
   findTeams,
   findTeamByName,
   findTeamById,
   deleteTeam,
};

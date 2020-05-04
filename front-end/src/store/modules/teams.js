import axios from "axios";

export const state = {
  teams: [],
};

export const namespaced = true;

export const mutations = {
  SET_TEAMS(state, teams) {
    state.teams = teams;
  },
};

export const actions = {
  fetchTeamsByUserId({ commit }) {
    return axios
      .get(`http://localhost:3330/teams/by-user`)
      .then((resp) => {
        commit("SET_TEAMS", resp.data);
      })
      .catch((err) => {
        throw err.response;
      });
  },
};

export const getters = {
  formatedToSelectTeams: (state) => {
    return state.teams.map((team) => ({ value: team.id, text: team.nome }));
  },
  getTeamName: (state) => (teamId) => {
    return state.teams.find((team) => team.id === teamId)?.nome;
  },
};

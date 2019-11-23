import { stakeholdersService } from '../_services/stakeholders.service'

const state = () => ({
  all: []
})

const getters = {

  getStakeholders(state) {
    return state.all
  }
}

const actions = {

  getStakeholdersFromApi ({ commit }) {
    stakeholdersService.getData( data => {
      commit('SET_ALL_STAKEHOLDERS', data.stakeholders)
    });
  },
  
  addNewStakeholders ({ commit }, stakeholder) {
    commit('ADD_NEW_STAKEHOLDER', stakeholder);
  }
}

const mutations = {

  SET_ALL_STAKEHOLDERS (state, stakeholders) {
    state.all = stakeholders
  },

  ADD_NEW_STAKEHOLDER (state, stakeholder) {
    state.all.push(stakeholder)
  }
}

export const stakeholders = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

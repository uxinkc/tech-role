
import { techService } from '../_services/tech.service'

const state = () => ({
  all: []
})

const getters = {
  
  getTech (state) {
    return state.all;
  }
}

const actions = {

  getTechFromApi ({ commit }) {
    techService.getData( data => {
      commit('SET_ALL_TECH', data);
    });
  }
}

const mutations = {

  SET_ALL_TECH (state, tech) {
    state.all = tech;
  }

}

export const tech = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

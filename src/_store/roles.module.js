
//import { rolesService } from '../_services/roles.service'
import { service } from '../_services/service.js';

const state = () => ({
  all: [],
  searchResults: []
})

const getters = {
  
  getRoles (state) {
    return state.all;
  },

  getSearchResults(state) {
    return state.searchResults;
  }
}

const actions = {

  getRolesFromApi ({ commit }) {
    service.getData('roles', data => { commit('SET_ALL_ROLES', data) } );
  },

  getTechFromRole ({commit}, str){
    service.getResults('roles', str, data => { commit('GET_SEARCH_RESULTS', data) } );
  }
}

const mutations = {

  SET_ALL_ROLES (state, roles) {
    state.all = roles;
  },

  GET_SEARCH_RESULTS (state, data){
    state.searchResults = data;
  }

}

export const roles = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

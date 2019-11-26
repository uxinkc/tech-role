
import { service } from '../_services/service.js';

const state = () => ({
  all: [],
  assocTech: []
})

const getters = {
  
  getRoles (state) {
    return state.all;
  },

  getAssocTech(state) {
    return state.assocTech;
  }
}

const actions = {

  getRolesFromApi ({ commit }) {
    service.getFakeData('roles', data => { commit('SET_ALL_ROLES', data) } );
  },

  getTechFromRole ({commit}, str){
    service.getTechFromRole(str, data => { commit('GET_SEARCH_RESULTS', data) } );
  }
}

const mutations = {

  SET_ALL_ROLES (state, roles) {
    state.all = roles;
  },

  GET_SEARCH_RESULTS (state, data){
    console.log('received from service', data)
    if(data.length > 0){
      state.assocTech = data;
    } else {
      state.assocTech = [{
        tech: 'No Results',
        desc: '',
        assocRoles: []
      }];
    }
  }

}

export const roles = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

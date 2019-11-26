
import { service } from '../_services/service';

const state = () => ({
  all: [],
  assocRoles: []
})

const getters = {
  
  getTech(state) {
    return state.all;
  },

  getAssocRoles(state) {
    return state.assocRoles;
  }
}

const actions = {

  getTechFromApi ({ commit }) {
    service.getFakeData('tech', data => { commit('SET_ALL_TECH', data)} );
  },

  getRolesFromTech ({commit}, str){
    service.getRolesFromTech(str, data => { commit('GET_SEARCH_RESULTS', data) } );
  }

}

const mutations = {

  SET_ALL_TECH (state, tech) {
    state.all = tech;
  },

  GET_SEARCH_RESULTS (state, data){
    console.log('received from service', data)
    if(data.length > 0){
      state.assocRoles = data;
    } else {
      state.assocRoles = [{
        roles: 'No Results',
        desc: '',
        assocTech: []
      }];
    }
  }

  


}

export const tech = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

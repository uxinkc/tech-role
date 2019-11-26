
import { service } from '../_services/service';

const state = () => ({
  all: [],
  searchResults: []
})

const getters = {
  
  getTech (state) {
    return state.all;
  },

  getSearchResults(state) {
    return state.searchResults;
  }
}

const actions = {

  getTechFromApi ({ commit }) {
    service.getData('tech', data => { commit('SET_ALL_TECH', data)} );
  },

  getTechSearchResultsFromApi ({commit}, str){
    commit('GET_SEARCH_RESULTS', str);
  }

}

const mutations = {

  SET_ALL_TECH (state, tech) {
    state.all = tech;
  },

  GET_SEARCH_RESULTS (state, str){
    console.log('tech.modules.. ',str)
    console.log('tech.state',state.all)
    let newResults = state.all.map( function(obj){
      console.log(obj.tech);
      if(str == obj['tech']){
        return obj
      }
    });
    
    state.searchResults = newResults;
  }


}

export const tech = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

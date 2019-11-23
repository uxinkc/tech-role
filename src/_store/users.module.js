
import { service } from '../_services/users.service';


const state = {
  all: []
};

const getters = {

};

const actions = {

  login({ commit }){
    service.getAllUsers( users => {
      commit('SET_ALL_USERS', users);
    });
  }
  
};

const mutations = {

  SET_ALL_USERS( state, users ){
    state.all = users;
  }

};

export const users = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
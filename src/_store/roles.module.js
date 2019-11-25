
import { rolesService } from '../_services/roles.service'

const state = () => ({
  all: []
})

const getters = {
  
  getRoles (state) {
    return state.all;
  }
}

const actions = {

  getRolesFromApi ({ commit }) {
    rolesService.getData( data => {
      commit('SET_ALL_ROLES', data);
    });
  }
}

const mutations = {

  SET_ALL_ROLES (state, roles) {
    state.all = roles;
  }

}

export const roles = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

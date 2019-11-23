import { authService } from '../_services/auth.service'

const state = () => ({
  auth: {
    loggedIn: false
  } 
})

const getters = {
  getIsLoggedIn (state) {
    return state.auth.loggedIn
  }
}

const actions = {
  getAuthFromApi ({ commit }) {
    authService.getData( data => {
      commit('SET_AUTHENTICATION', data.auth)
    });
  },
  setLoggedIn ({ commit }, bool) {
    commit('SET_LOGGED_IN', bool);
  }
}

const mutations = {
  SET_AUTHENTICATION (state, auth) {
    state.auth = auth;
  },
  SET_LOGGED_IN (state, bool) {
    state.auth.loggedIn = bool;
  }
}

export const auth = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

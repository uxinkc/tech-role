import { authService } from '../_services/auth.service'
import router from '../_router/routes';

const state = () => ({
  auth: {},
  loggedIn: false 
})

const getters = {
  getIsLoggedIn (state) {
    return state.loggedIn;
  }
}

const actions = {
  login ({ commit }) {
    console.log('actions... login')
    authService.getLogin( data => {
      commit('SET_AUTHENTICATION', data)
    });
  },
  logout ({ commit }) {
    authService.getLogout( data => {
      commit('SET_LOGGED_OUT', data)
    });
  },
  signUp ({ commit }, auth) {
    authService.getSignUp(auth, data => {
      commit('SET_SIGN_UP', data)
    });
  },
}

const mutations = {
  SET_AUTHENTICATION (state, auth) {
    if(auth.code){
      console.log("mutation... no auth");
      state.loggedIn = false;
    } else if( auth.providerData ){
      console.log('WHAT??',auth.providerData)
      state.loggedIn = true;
      state.auth = auth.providerData;
      router.replace('/roles');
    }
  },

  SET_LOGGED_OUT (state, auth) {
    if(auth.error){
      console.log('error logging out:',auth.error)
    }
    state.loggedIn = auth.loggedIn;
    router.replace('/');
  },

  SET_SIGN_UP (state, auth) {
    //state.loggedIn = bool;
  }


}

export const auth = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};


const state = () => ({
  isLoading: false
})

const getters = {

  isLoading (state) {
    return state.isLoading;
  }
}

const actions = {
  setIsLoading ({ commit }, payload){
    commit('SET_IS_LOADING', payload);
  }
}

const mutations = {
  SET_IS_LOADING (state, bool) {
    state.isLoading = bool;
  }
}

export const loading = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

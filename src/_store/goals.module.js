
import { goalsService } from '../_services/goals.service'

const state = () => ({
  all: []
})

const getters = {
  
  getGoals (state) {
    return state.all;
  }
}

const actions = {

  getGoalsFromApi ({ commit }) {
    goalsService.getData( data => {
      commit('SET_ALL_GOALS', data);
    });
  },

  submitNewGoal ({ commit }, payload) {    
    goalsService.submitNewGoal(payload, (goals) => {
      commit('SUBMIT_NEW_GOAL', goals);
    });
    
  }
}

const mutations = {

  SET_ALL_GOALS (state, goals) {
    state.all = goals;
  },

  SUBMIT_NEW_GOAL (state, goal) {
    state.all.push( goal );
  }
}

export const goals = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

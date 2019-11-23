
import { storyLabelsService } from '../_services/storyLabels.service'

const state = () => ({
  all: {}
})

const getters = {

  getStoryLabels(state) {
    return state.all;
  }
}

const actions = {

  getStoryLabelsFromApi ({ commit }) {
    storyLabelsService.getData( data => {
      commit('SET_ALL_STORY_LABELS', data)
    });
  }
}

const mutations = {
  
  SET_ALL_STORY_LABELS (state, storyLabels) {
    state.all = storyLabels;
  }
}

export const storyLabels = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

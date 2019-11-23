import { storiesService } from '../_services/stories.service'

const state = () => ({
  all: []
})

const getters = {

  getStories(state) {
    return state.all
  }
}

const actions = {

  getStoriesFromApi ({ commit }) {
    storiesService.getData( data => {
      commit('SET_ALL_STORIES', data);
    });
    
  },

  addNewStory ({ commit }, story) {
    commit('ADD_NEW_STORY', story);
  }
}

const mutations = {

  SET_ALL_STORIES (state, stories) {
    // returns an array of stories
    state.all = stories;
  },

  ADD_NEW_STORY (state, story) {
    state.all.push(story)
  }
}

export const stories = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

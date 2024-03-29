
import { scrapeService } from '../_services/scrape.service'

const state = () => ({
  all: []
})

const getters = {
  
  getScrape (state) {
    return state.all;
  }
}

const actions = {
  getScrapeFromApi ({ commit }) {
    scrapeService.getJobsGithub( data => {
      commit('SET_ALL_DATA', data);
    });
  }
}

const mutations = {
  SET_ALL_DATA (state, data) {
    state.all = data;
  }
}

export const scrape = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

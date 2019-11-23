
import Vue from 'vue';
import Vuex from 'vuex';
import { loading } from './loading.module';
import { auth } from './auth.module';
import { stories } from './stories.module';
import { storyLabels } from './storyLabels.module';
import { stakeholders } from './stakeholders.module';
import { goals } from './goals.module';


Vue.use( Vuex );

export const store = new Vuex.Store({
  modules: {
    loading,
    auth,
    stories,
    storyLabels,
    stakeholders,
    goals
  }
});

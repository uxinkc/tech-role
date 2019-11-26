
import Vue from 'vue';
import Vuex from 'vuex';
import { scrape } from './scrape.module';
import { loading } from './loading.module';
import { tech } from './tech.module';
import { roles } from './roles.module';


Vue.use( Vuex );

export const store = new Vuex.Store({
  modules: {
    scrape,
    loading,
    tech,
    roles
  }
});


import Vue from 'vue';
import router from './_router/routes';
import { store } from './_store/store';
import App from './views/App';
import Buefy from 'buefy';


Vue.config.productionTip = false;

Vue.use(Buefy, {defaultPack: 'mdi'});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

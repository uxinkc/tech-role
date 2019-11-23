
import Vue from 'vue';
import Router from 'vue-router';

const Roles = () => import('../views/Roles');
const Tech = () => import('../views/Tech');

Vue.use( Router );

export default new Router({
  mode: 'history',
  routes: [
    { 
      path: '/',
      name: 'tech',
      component: Tech
    },
    { path: '/roles',
      name: 'roles',
      component: Roles
    },
    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

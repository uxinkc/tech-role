
import Vue from 'vue';
import Router from 'vue-router';

const Stories = () => import('../views/Stories');
const Goals = () => import('../views/Goals');
const Stakeholders = () => import('../views/Stakeholders');
const Accounts = () => import('../views/Accounts');
/*
const Roadmap = () => import('../views/Roadmap');
const AddStory = () => import('../views/AddStory');
*/

Vue.use( Router );

export default new Router({
  mode: 'history',
  routes: [
    { 
      path: '/',
      name: 'stories',
      component: Stories
    },
    { path: '/goals',
      name: 'goals',
      component: Goals
    },

    { path: '/stakeholders',
      name: 'stakeholders',
      component: Stakeholders
    },

    {
      path: '/accounts',
      name: 'accounts',
      component: Accounts
    },
/*
    { path: '/roadmap',
      name: 'roadmap',
      component: Roadmap
    },

    { path: '/stories/add',
      name: 'add-story',
      component: AddStory
    },

    */

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

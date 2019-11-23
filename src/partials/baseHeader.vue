<template>
  <header>
    <b-navbar :shadow="true">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <div class="is-size-2 has-text-weight-bold is-family-sans-serif">Story</div>
          <!--<img
            src="https://www.pngkey.com/png/full/141-1416946_logos-what-is-a-generic-logo-transparent-background.png"
            alt="Simplify with Story"
          />-->
        </b-navbar-item>
      </template>
      <template slot="start">
        
      </template>

      <template slot="end" v-if="loggedIn">
        
        <b-navbar-dropdown label="Project">
          <b-navbar-item tag="router-link" :to="{ path: '/' }">Stories</b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/goals' }">Goals</b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/stakeholders' }">Stakeholders</b-navbar-item>

          <b-navbar-item tag="router-link" :to="{ path: '/accounts' }">Accounts</b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/roadmap' }">Roadmap</b-navbar-item>
          
          <b-navbar-item>
            <div class="buttons">
              <a class="button is-warning" @click="addNewProject()">
                <strong>Add New Project</strong>
              </a>
            </div>
          </b-navbar-item>
        </b-navbar-dropdown>

        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-primary" @click="cardModal()">
              <strong>Add New Story</strong>
            </a>
          </div>
        </b-navbar-item>
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-secondary" @click="setLoggedOut()">
              <strong>Log Out</strong>
            </a>
          </div>
        </b-navbar-item>

      </template>
      <template slot="end" v-else>
        
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-primary" @click="setSignUp()">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light" @click="setLoggedIn()">Log in</a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </header>
</template>

<script>
import AddStoryModal from '../components/modal/AddStoryModal';

export default {

  data(){
    return {
      authCount: 0
    }
  },

  components: {
    AddStoryModal: AddStoryModal
  },

  computed: {

    loggedIn: function(){  
      return this.$store.getters['auth/getIsLoggedIn']; 
    },
  },

  methods: {

    cardModal: function() {
      this.$buefy.modal.open({
        parent: this,
        component: AddStoryModal,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2'
      })
    },

    updateAuthCount: function(){
      this.authCount++;
    },

    resetAuthCount: function(){
      this.authCount = 1;
    },

    setLoggedIn: function() {
      if(this.authCount < 1){
        this.updateAuthCount();
        this.$store.dispatch('auth/getAuthFromApi');
      } else {
        this.$store.dispatch('auth/setLoggedIn', true);
      }
    },

    setLoggedOut: function() {
      this.$router.push({path: '/'});
      this.resetAuthCount();
      this.$store.dispatch('auth/setLoggedIn', false);
    },

    setSignUp: function() {
      alert("Sorry, you aren't cool enough.");
    },

    addNewProject: function(){
      alert("gonna add some stuff");
    }
  },

  beforeMount(){
    //this.$store.dispatch('auth/getAuthFromApi');
  }
};

</script>
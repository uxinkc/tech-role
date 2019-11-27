<template>
  <header>
    <b-navbar :shadow="true">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">

          <div class="is-size-2 has-text-weight-bold is-family-sans-serif">Tech<img src="../static/img/cinn-roll1.png" height="80"/>Role</div>
          <!--<img
            src="https://www.pngkey.com/png/full/141-1416946_logos-what-is-a-generic-logo-transparent-background.png"
            alt="Simplify with Story"
          />-->
        </b-navbar-item>
      </template>
      <template slot="start">
        
      </template>

      <template slot="end" v-if="loggedIn">
      
        <b-navbar-item tag="router-link" :to="{ path: '/tech' }">Find Roles</b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/roles' }">Find Tech</b-navbar-item>

        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-light" @click="logout()">Log Out</a>
          </div>
        </b-navbar-item>
          
      </template>
      <template slot="end" v-else>
        
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-primary" @click="signUp()">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light" @click="login()">Log in</a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </header>
</template>

<script>

export default {

  data(){
    return {

    }
  },

  components: {

  },

  computed: {
    loggedIn: function(){  
      return this.$store.getters['auth/getIsLoggedIn']; 
    }
  },

  methods: {

    login: function() {
      this.$store.dispatch('auth/login');
    },
    logout: function() {
      this.$store.dispatch('auth/logout');
    },
    signUp: function() {
      this.$store.dispatch('auth/signup', {email:'', password:''});
    },


  },

  beforeMount(){

  }
};

</script>
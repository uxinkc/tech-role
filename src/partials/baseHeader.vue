<template>
  <header>
    <b-navbar :shadow="true">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <div class="is-size-2 has-text-weight-bold is-family-sans-serif">Tech Role</div>
          <!--<img
            src="https://www.pngkey.com/png/full/141-1416946_logos-what-is-a-generic-logo-transparent-background.png"
            alt="Simplify with Story"
          />-->
        </b-navbar-item>
      </template>
      <template slot="start">
        
      </template>

      <template slot="end">
      
        <b-navbar-item tag="router-link" :to="{ path: '/' }">Tech to Roles</b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/roles' }">Roles to Tech</b-navbar-item>
          
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

  },

  methods: {


  },

  beforeMount(){

  }
};

</script>
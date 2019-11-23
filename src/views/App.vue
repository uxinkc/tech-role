
<template>
  <div>
    <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "app",
  data() {
    return {
      isFullPage: true
    }
  },
  watch: {
    $route (to, from){
        
    } 
  },
  computed: {
    isLoading: function(){
      return this.$store.getters['loading/isLoading'];
    }
  }

};

</script>
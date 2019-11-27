
<template>
  <section>
    <baseHeader></baseHeader>

    <main id="main-content">
      <section class="hero is-primary is-fullheight-with-navbar">
        <div class="hero-body">
          <div class="container has-text-centered">
            <h1 class="title">
              Tech made simple
            </h1>
            
          </div>
        </div>
      </section>
      <section>
        <div v-for="job in jobs" class="card">
          <h4>{{job.title}}</h4>
        </div>
      </section>
    </main>


  </section>
</template>

<script>
// PARTIALS
import baseHeader from '../partials/baseHeader';

// COMPONENTS


export default {

  components: {
    baseHeader: baseHeader
  },
  
  data() {
    return {
      hasPerformedScrape: false
    }
  },

  computed: {
    jobs: function(){
      let data = this.$store.getters['scrape/getScrape'];
      return data;
    }

  },
  
  methods: {
    scrapeCompleted: function(){
      this.hasPerformedScrape = true;
    }
  },

  created(){
    
  }
}
</script>
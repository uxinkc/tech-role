
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
            <h2 class="subtitle">
              Tech Role makes it easy for HR and technical recruiters to identify and source candidates based on industry wide conventions. 
            </h2>
          </div>
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


  },
  
  methods: {
    scrapeCompleted: function(){
      this.hasPerformedScrape = true;
    }
  },

  created(){
    this.$store.dispatch('scrape/getScrapeFromApi');
  }
}
</script>
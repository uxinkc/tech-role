
<template>
  <section>
    <baseHeader></baseHeader>

    <main id="main-content">
      <!--<section class="hero is-primary is-fullheight-with-navbar">-->
      <section class="hero is-primary is-medium">
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
      <section class="">
      <div class="container">
        
          <div v-for="job in jobs" class="card">
            <h4>{{job.title}}</h4>
            <b-collapse :open="false" position="is-bottom" aria-id="contentIdForA11y1">
              <a slot="trigger" slot-scope="props" aria-controls="contentIdForA11y1">
                <i class="material-icons">{{ !props.open? 'expand_more' : 'expand_less' }}</i>
                {{ !props.open ? 'View Details' : 'Hide Details' }}
              </a>
              <span v-for="tech in job.tech">
                  <a class="tag" @click="searchAssociatedTech(tech)" type="is-info">{{tech}}</a>
                </span>
            </b-collapse>
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
    jobs: function(){
      let data = this.$store.getters['scrape/getScrape'];
      return data;
    }

  },
  
  methods: {
    scrapeCompleted: function(){
      this.hasPerformedScrape = true;
    },
    searchAssociatedTech: function(tech){
      window.scrollTo(0,0);
      this.$router.replace('/tech/:'+tech);
    },
  },

  created(){
    this.$store.dispatch('scrape/getScrapeFromApi');
  }
}
</script>
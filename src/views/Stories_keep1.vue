
<template>
  <section>
    <baseHeader></baseHeader>

    <main id="" v-if="loggedIn">
      <div class="container">
        <div class="columns">
          <div class="column">
          </div>
          <div class="column is-two-thirds">
            <section class="section">
              <h1 class="title">Project: Victory CRM Product</h1>
              <div v-for="story in stories" class="column">
                <div>
                  <div class="box">
                    <article class="media">
                      
                      <div class="media-content">
                        <div class="content">
                          <p>
                            <strong>{{ story.title }}</strong>
                            <br>
                            {{ storyLabels.stakeholder.label }} <b-field>
                              <b-autocomplete
                                v-model="story.stakeholder"
                                placeholder="e.g. Product Owner"
                                :keep-first="false"
                                :open-on-focus="true"
                                :data="stakeholders"
                                field="story-stakeholder"
                                ref="autocompleteStakeholder"
                                @select="option => selected = option">
                                <template slot="header">
                                  <a @click="addStakeholder">
                                    <span> Add new stakeholder... </span>
                                  </a> 
                                </template>
                              </b-autocomplete>
                            </b-field> {{ storyLabels.task.label }} {{ story.task }} {{ storyLabels.purpose.label }} {{ story.purpose }} {{ storyLabels.benefit.label }} <b-field>
                            <b-autocomplete
                              v-model="story.benefit"
                              placeholder="e.g. benefit of the task"
                              :keep-first="false"
                              :open-on-focus="true"
                              :data="goals"
                              field="story-benefit"
                              ref="autocompleteGoal"
                              @select="option => selected = option">
                              <template slot="header">
                                <a @click="addGoal">
                                  <span> Add new goal... </span>
                                </a> 
                              </template>
                            </b-autocomplete>
                          </b-field>
                          </p>
                        </div>
                        <nav class="level is-mobile">
                          <div class="level-left">
                            <a class="level-item" aria-label="reply">
                              <span class="icon is-small">
                                <i class="fas fa-reply" aria-hidden="true"></i>
                              </span>
                            </a>
                            <a class="level-item" aria-label="retweet">
                              <span class="icon is-small">
                                <i class="fas fa-retweet" aria-hidden="true"></i>
                              </span>
                            </a>
                            <a class="level-item" aria-label="like">
                              <span class="icon is-small">
                                <i class="fas fa-heart" aria-hidden="true"></i>
                              </span>
                            </a>
                          </div>
                        </nav>
                      </div>
                    </article>
                  </div>

                </div>
              </div>
            </section>
          </div>
          <div class="column">
          </div>
        </div>
      </div>
    </main>
    <main v-else>
      <section class="hero is-warning is-fullheight-with-navbar">
        <div class="hero-body">
          <div class="container has-text-centered">
            <h1 class="title">
              Priorities Matter
            </h1>
            <h2 class="subtitle">
              Story allows you to focus on what's important - USERS
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
import baseFooter from '../partials/baseFooter';

// COMPONENTS

export default {

  components: {
    baseHeader: baseHeader,
    baseFooter: baseFooter
  },

  data() {
    return {
      keepFirst: false,
      openOnFocus: false,
      stakeholder: '',
      selected: null,
      columns: [{field:'title', label:''}]
    }
  },
  
  computed: {

    loggedIn: function(){  
      return this.$store.getters['auth/getIsLoggedIn']; 
    },
    
    storyLabels: function(){
      return this.$store.state.storyLabels.all;
    },
    
    stories: function(){  
      return this.$store.state.stories.all; 
    },

    stakeholders: function(){

      let data = this.$store.state.stakeholders.all.map( obj => {
        return obj.label;
      });

      return data;
    },

    goals: function(){

      let data = this.$store.state.goals.all.map( obj => {
        return obj.title;
      });

      return data;
    },

  },

  methods: {
    
    addStakeholder() {
      this.$buefy.dialog.prompt({
        message: `Add Stakeholder`,
        inputAttrs: {
          placeholder: 'e.g. Sales Representative',
          maxlength: 25,
          value: this.stakeholder
        },
        
        confirmText: 'Add',

        onConfirm: (value) => {
          this.stakeholders.push(value)
          this.$refs.autocompleteStakeholder.setSelected( value )
        }
      })
    },

    addGoal() {
      this.$buefy.dialog.prompt({
        message: `Add Goal`,
        inputAttrs: {
          placeholder: 'benefit of the task',
          maxlength: 40,
          value: this.benefit
        },
        
        confirmText: 'Add',

        onConfirm: (value) => {
          this.goals.push(value)
          this.$refs.autocompleteGoal.setSelected( value )
        }
      })
    },

    
  },


  beforeMount(){
    this.$store.dispatch('storyLabels/getStoryLabelsFromApi');
    this.$store.dispatch('stories/getStoriesFromApi');
    this.$store.dispatch('stakeholders/getStakeholdersFromApi');
    this.$store.dispatch('goals/getGoalsFromApi');
  }
}
</script>
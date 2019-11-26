
<template>
  <section>
    <baseHeader></baseHeader>

    <main id="main-content">
      <div class="container">
        <section class="section">
          <h1 class="title">Give Tech <i class="material-icons">trending_flat</i> Get Roles</h1>

          <b-field>
            <b-autocomplete
              v-model="tech"
              placeholder="e.g. Angular"
              :keep-first="keepFirst"
              :open-on-focus="openOnFocus"
              :data="techAutocompleteData"
              field="tech"
              ref="autocompleteTech"
              :expanded="true"
              @select="option => selected = option">
            </b-autocomplete>
            <b-button class="button is-primary" @click="getRolesFromTech()">Find Roles</b-button>
          </b-field>
          

          <div v-if="showResults">
            <hr />
            <div v-for="role in getAssocRoles">
              <div class="content">
                <h3>
                    {{role.role}}
                </h3>
                <p>
                    {{role.desc}}
                </p>
              </div>
              <b-collapse :open="false" position="is-bottom" aria-id="contentIdForA11y1">
                <a slot="trigger" slot-scope="props" aria-controls="contentIdForA11y1">
                    <!--<b-icon pack="mdi" :icon="!props.open? 'expand_more' : 'expand_less'"></b-icon>-->
                    <i class="material-icons">{{ !props.open? 'expand_more' : 'expand_less' }}</i>
                    {{ !props.open ? 'View Associated Technologies' : 'Hide Technologies' }}
                </a>
                <span v-for="t in role.assocTech">
                  <a class="tag" @click="searchAssociatedTech(t)" type="is-info">{{t}}</a>
                </span>
              </b-collapse>
              <br/>
            </div>
          </div>


        </section>
      </div>
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
      //role: [],
      tech: '',
      keepFirst: false,
      openOnFocus: true,
      showResults: false,
			selected: '',
    }
  },

  computed: {

    techAutocompleteData: function(){
      let data = this.$store.getters['tech/getTech'];
      return data;
    },

    getAssocRoles: function(){
      let results = this.$store.getters['tech/getAssocRoles'];
      return results;
    },

    rolesData: function(){
      let data = this.$store.getters['roles/getRoles'];
      return data;
    }

  },
  
  methods: {

    toggleShowResults: function(){
			this.showResults = !this.showResults;
    },

    searchAssociatedTech: function(tech){
      window.scrollTo(0,0);
			this.tech = tech;
    },
    
    getRolesFromTech: function(){
      this.showResults = true;
      let searchStr = this.$refs.autocompleteTech.value;
      this.$store.dispatch('tech/getRolesFromTech', searchStr);
    }

  },

  mounted(){
    this.$store.dispatch('tech/getTechFromApi');
    this.$store.dispatch('roles/getRolesFromApi');
  }
}
</script>
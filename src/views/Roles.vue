
<template>
  <section>
    <baseHeader></baseHeader>

    <main id="main-content">
      <div class="container">
        <section class="section">
          <h1 class="title">Role <i class="material-icons">trending_flat</i> Tech</h1>

          <b-field>
            <b-autocomplete
              :expanded="true"
              v-model="role"
              placeholder="e.g. Front-end Developer"
              :keep-first="false"
              :open-on-focus="true"
              :data="rolesAutocompleteData"
              field="roles"
              ref="autocompleteRoles"
              @select="option => selected = option">
            </b-autocomplete>
            <b-button class="button is-primary" @click="getTechFromRole()">Find Technologies</b-button>
          </b-field>

          <div v-if="showResults">
            <hr />
            <div v-for="tech in techSearchResults">
              <div class="content">
                <h3>
                    {{tech.tech}}
                </h3>
                <p>
                    {{tech.desc}}
                </p>
              </div>
              <b-collapse :open="false" position="is-bottom" aria-id="contentIdForA11y1">
                <a slot="trigger" slot-scope="props" aria-controls="contentIdForA11y1">
                  <i class="material-icons">{{ !props.open? 'expand_more' : 'expand_less' }}</i>
                  {{ !props.open ? 'View Associated Roles' : 'Hide Roles' }}
                </a>
                <span v-for="role in tech.assocRoles">
                  <a class="tag" @click="searchAssociatedRoles(role)" type="is-info">{{role}}</a>
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
      tech: [],
      role: '',
      showResults: true,
      selected: ''
    }
  },

  computed: {

    rolesAutocompleteData: function(){
      let data = this.$store.getters['roles/getRoles'];
      return data;
    },

    techSearchResults: function(){
      let results = this.$store.getters['tech/getSearchResults'];
      return results;
    },

    techData: function(){
      let data = this.$store.getters['tech/getTech'];
      return data;
    }

  },
  
  methods: {

		toggleShowResults: function(){
			this.showResults = !this.showResults;
		},

    searchAssociatedRoles: function(role){
      this.role = role;
    },
    
    getTechFromRole: function(){
      this.showResults = true;
      let searchStr = this.$refs.autocompleteRoles.value;
      this.$store.dispatch('roles/getTechFromRole', searchStr);
    }
  },

  mounted(){
    this.$store.dispatch('tech/getTechFromApi');
    this.$store.dispatch('roles/getRolesFromApi');
  }
}
</script>
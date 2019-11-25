
<template>
  <section>
    <baseHeader></baseHeader>

    <main id="main-content">
      <div class="container">
        <section class="section">
          <h1 class="title">Give Role. Get Tech</h1>

          <b-field>
            <b-autocomplete
              v-model="role"
              placeholder="e.g. Front-end Developer"
              :keep-first="false"
              :open-on-focus="true"
              :data="roles"
              field="roles"
              ref="autocompleteRoles"
              @select="option => selected = option">
            </b-autocomplete>
          </b-field>


          <div v-if="showResults">

            <div v-for="t in tech" class="content">
              <h3>
                  {{t.tech}}
              </h3>
              <p>
                  {{t.desc}}
              </p>
            </div>
            <b-collapse :open="false" position="is-bottom" aria-id="contentIdForA11y1">
              <a slot="trigger" slot-scope="props" aria-controls="contentIdForA11y1">
                  <b-icon :icon="!props.open ? 'menu-down' : 'menu-up'"></b-icon>
                  {{ !props.open ? 'View Associated Roles' : 'Hide Roles' }}
              </a>
              <span><a v-for="role in t.assocRoles" @click="searchAssociatedRoles(role)" type="is-info">{{role}}</a></span>
            </b-collapse>
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
      role: '',
      showResults: true,
    }
  },

  computed: {

    tech: function(){
      let data = this.$store.getters['tech/getTech'];
      return data;
    },

    roles: function(){
      let data = this.$store.getters['roles/getRoles'];
      return data;
    }

  },
  
  methods: {

		toggleShowResults: function(){
			this.showResults = !this.showResults;
		},

    searchAssociatedRole: function(tech){
			alert('find tech with: ' + role );
		}
  },

  created(){
    this.$store.dispatch('tech/getTechFromApi');
    this.$store.dispatch('roles/getRolesFromApi');
  }
}
</script>
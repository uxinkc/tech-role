
<template>
  <section>
    <baseHeader></baseHeader>

    <main id="main-content">
      <div class="container">
        <section class="section">
          <h1 class="title">Tech <i class="material-icons">trending_flat</i> Roles</h1>

          <b-field>
            <b-autocomplete
              v-model="tech"
              placeholder="e.g. Angular"
              :keep-first="false"
              :open-on-focus="true"
              :data="techAutocompleteData"
              field="tech"
              ref="autocompleteTech"
              @select="option => selected = option">
            </b-autocomplete>
          </b-field>

          <hr />

          <div v-if="showResults">

            <div v-for="role in rolesResults">
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
      role: [],
      tech: '',
      showResults: true,
			selected: '',
    }
  },

  computed: {

    techAutocompleteData: function(){
      let data = this.$store.getters['tech/getTech'];
      return data;
    },

    rolesResults: function(){
      let data = this.$store.getters['roles/getRoles'];
      return data;
    }

  },
  
  methods: {

    toggleShowResults: function(){
			this.showResults = !this.showResults;
    },

    searchAssociatedTech: function(tech){
			alert('find role with: ' + tech );
		}
  },

  mounted(){
    this.$store.dispatch('tech/getTechFromApi');
    this.$store.dispatch('roles/getRolesFromApi');
  }
}
</script>
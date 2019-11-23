
<template>
  <section>
    <baseHeader></baseHeader>

    <main id="main-content">
      <div class="container">
        <section class="section">
          <h1 class="title">Give Role. Get Tech</h1>

          <b-field>
            <b-autocomplete
              v-model="roles"
              placeholder="e.g. Front-end Developer"
              :keep-first="false"
              :open-on-focus="true"
              :data="roles"
              field="roles"
              ref="autocompleteRoles"
              @select="option => selected = option">
            </b-autocomplete>
          </b-field>

          <div class="box" v-if="showResults">
            <b-table
              :data="tech"
              :columns="columns">
              <template slot-scope="props">

                <b-table-column field="tech" label="Tech">
                    {{ props.row.tech }}
                </b-table-column>

                <b-table-column field="desc" label="Description">
                  <span class="">{{ props.row.desc }}</span>
                </b-table-column>

                <b-table-column field="assocTech" label="Associated Roles">
                    <b-button v-for="role in props.row.assocRoles" @click="searchAssociatedRoles(role)" type="is-info">{{role}}</b-button>
                </b-table-column>                
            	</template>
            </b-table>
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
      showResults: false,
      selected: '',
      columns: [
        {
          field: 'tech',
          label: 'Technology'
        },        
        {
          field: 'desc',
          label: 'Description'
				},
				{
          field: 'assocRoles',
          label: 'Associated Roles'
				}
			]
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
    this.$store.dispatch('roles/getRolesFromApi');
  }
}
</script>
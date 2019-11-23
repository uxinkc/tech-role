
<template>
  <section>
    <baseHeader></baseHeader>

    <main id="main-content">
      <div class="container">
        <section class="section">
          <h1 class="title">Give Tech. Get Roles</h1>

          <b-field>
            <b-autocomplete
              v-model="tech"
              placeholder="e.g. Angular"
              :keep-first="false"
              :open-on-focus="true"
              :data="tech"
              field="tech"
              ref="autocompleteTech"
              @select="option => selected = option">
            </b-autocomplete>
          </b-field>

          <div class="box" v-if="showResults">
            <b-table
              :data="roles"
              :columns="columns">
              <template slot-scope="props">

                <b-table-column field="roles" label="Roles">
                    {{ props.row.roles }}
                </b-table-column>

                <b-table-column field="desc" label="Description">
                  <span class="">{{ props.row.desc }}</span>
                </b-table-column>

                <b-table-column field="assocTech" label="Associated Technologies">
                    <b-button v-for="tech in props.row.assocTech" @click="searchAssociatedTech(tech)" type="is-info">{{tech}}</b-button>
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
          field: 'roles',
          label: 'Roles'
        },        
        {
          field: 'desc',
          label: 'Description'
				},
				{
          field: 'assocTech',
          label: 'Associated Technologies'
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

    searchAssociatedTech: function(tech){
			alert('find role with: ' + tech );
		}
  },

  created(){
    this.$store.dispatch('roles/getTechFromApi');
  }
}
</script>
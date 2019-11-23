
<template>
  <section>
    <baseHeader></baseHeader>

    <main id="main-content">
      <div class="container">
        <section class="section">
          <h1 class="title">Stakeholders</h1>


          <b-field>
            <b-autocomplete
              v-model="stakeholder"
              placeholder="e.g. Product Owner"
              :keep-first="false"
              :open-on-focus="true"
              :data="stakeholders"
              field="stakeholder"
              ref="autocompleteStakeholder"
              @select="option => selected = option">
              <template slot="header">
                <a @click="addStakeholder">
                  <span> Add new stakeholder... </span>
                </a> 
              </template>
            </b-autocomplete>
          </b-field>
          <div class="buttons">
            <a class="button is-danger" @click="deleteStakeholder()">
              <strong>Delete Stakeholder</strong>
            </a>
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
      stakeholder: '',
      selected: null
    }
  },

  computed: {

    stakeholders: function(){

      let data = this.$store.getters['stakeholders/getStakeholders'];
      let mappedData = data.map( obj => { return obj.label });
      return mappedData;
    }

  },
  
  methods: {
    
    addStakeholder: function() {
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

    deleteStakeholder: function(){
      
    }


  },

  created(){
    this.$store.dispatch('stakeholders/getStakeholdersFromApi');
  }
}
</script>

<template>
  <section>
    <baseHeader></baseHeader>
    
    <main id="main-content">
      <div class="container">

        <section class="section">
          <h1 class="title">Goals</h1>
          
          <div class="box">
            <b-table
              :data="goals"
              :columns="columns"
              draggable
              @dragstart="dragstart"
              @drop="drop"
              @dragover="dragover"
              @dragleave="dragleave">
              <template slot-scope="props">
                <b-table-column field="priority" label="Rank" numeric sortable>
                    {{ props.row.priority }}
                </b-table-column>

                <b-table-column field="type" label="Type" sortable>
                    <span class="tag" :class="tagType(props.row.type)">
                        {{ props.row.type }}
                    </span>
                </b-table-column>

                <b-table-column field="title" label="Title">
                    {{ props.row.title }}
                </b-table-column>

                <b-table-column field="desc" label="Description">
                  <span class="">{{ props.row.desc }}</span>
                </b-table-column>

                <b-table-column field="actions" label="Actions">
                    <b-button @click="openEditModal(props.row.desc)" type="is-warning"><strong>Edit</strong></b-button>
                </b-table-column>                


            </template>

            </b-table>
          </div>
        

          <b-field label="Title">
            <b-input
              v-model="title"
              type="text"
              name="title"
              placeholder=""
            ></b-input>
          </b-field>

          <b-field label="Goal Type">
            <b-input
              v-model="type"
              type="text"
              name="type"
              placeholder="business or user"
            ></b-input>
          </b-field>

          <b-field label="Project ID">
            <b-input
              v-model="projectId"
              type="text"
              name="projectId"
              placeholder=""
            ></b-input>
          </b-field>

          <b-field label="Priority">
            <b-input
              v-model="priority"
              type="text"
              name="priority"
              placeholder=""
            ></b-input>
          </b-field>

          <b-field label="Description">
            <b-input
              v-model="desc"
              type="textarea"
              name="desc"
              placeholder=""
            ></b-input>
          </b-field>

          <b-field label="Notes">
            <b-input
              v-model="notes"
              type="textarea"
              name="notes"
              placeholder="add notes here..."
            ></b-input>
          </b-field>

          <b-button @click="submitNewGoal" type="is-primary">Submit New Goal</b-button>

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
      projectId: 1,
      priority: 1,
      title: '',
      type: '',
      desc: '',
      notes: '',
      columns: [
        {
          field: 'priority',
          label: 'Rank',
          width: '40',
          numeric: true
        },        
        {
          field: 'type',
          label: 'Type',
        },
        {
          field: 'title',
          label: 'Title',
          width: '300'
        },
        {
          field: 'desc',
          label: 'Description',
        },
        {
          field: 'actions',
          label: 'Actions'
        }
      ],
      draggingRow: null,
      draggingRowIndex: null
    }
  },
  
  computed: {

    goals: function(){
      let data = this.$store.getters['goals/getGoals'];
      let mappedData = data.map( obj => { return obj.title });

      //let arr = Object.keys(data).sort( function(a,b){ return data[a].priority - data[b].priority })
      let arr = this.sortGoalByPriority(data);
      console.log('arr ',arr);

      return arr;
    }

  },
  
  methods: {

    sortGoalByPriority: function( goals ){
      let sortable = [];
      for( var goal in goals ){

        sortable.push( goals[goal] );
      }
      sortable.sort( function(a,b) {
        return a['priority'] - b['priority'];
      });
      return sortable;
    },

    openEditModal: function( value ){
      this.$buefy.toast.open({
        message: value,
        duration: 3000
      });
    },

    submitNewGoal: function(){
      
      this.$store.dispatch('loading/setIsLoading', true);

      let newGoal = {
        projectId: this.projectId,
        priority: this.priority,
        type: this.type,
        title: this.title,
        desc: this.desc,
        notes: this.notes
      };
      this.$store.dispatch('goals/submitNewGoal', newGoal);
      this.clearForm();
    },

    clearForm: function(){
      this.projectId = '';
      this.priority = '';
      this.type = '';
      this.title = '';
      this.desc = '';
      this.notes = '';
    },

    tagType(value) {
      if (value == "business") {
          return 'is-info'
      } else {
          return 'is-success'
      }
    },

    dragstart (payload) {
      this.draggingRow = payload.row
      this.draggingRowIndex = payload.index
      payload.event.dataTransfer.effectAllowed = 'copy'
    },
    dragover(payload) {
      payload.event.dataTransfer.dropEffect = 'copy'
      payload.event.target.closest('tr').classList.add('is-selected')
      payload.event.preventDefault()
    },
    dragleave(payload) {
      payload.event.target.closest('tr').classList.remove('is-selected')
      payload.event.preventDefault()
    },
    drop(payload) {
      payload.event.target.closest('tr').classList.remove('is-selected');
      const droppedOnRowIndex = payload.index;
      this.$buefy.toast.open({
        message: `Moved ${this.draggingRow.title} from row ${this.draggingRowIndex + 1} to ${droppedOnRowIndex + 1}`,
        duration: 5000
      });
      this.setNewPriority(payload, (droppedOnRowIndex + 1) );
    },
    setNewPriority(goal, rank){

    }


  },

  created(){
    this.$store.dispatch('goals/getGoalsFromApi');
  }
}
</script>
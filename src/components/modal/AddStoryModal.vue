<template>
  <form action>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add a story</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Title">
          <b-input type="text" value="" placeholder="title of your story" required></b-input>
        </b-field>

        <b-field label="AS A">

          <b-autocomplete
            v-model="stakeholder"
            placeholder="e.g. Product Owner"
            :keep-first="false"
            :open-on-focus="true"
            :data="STAKEHOLDERS"
            field="story-stakeholder"
            ref="autocomplete"
            @select="option => stakeholderSelected = option">
            <template slot="header">
              <a @click="addStakeholder">
                <span> Add new stakeholder... </span>
              </a> 
            </template>
          </b-autocomplete>

        </b-field>

        <b-field class="hideme" aria-hidden="true">
          <b-input
            type="text"
            name="custom-stakeholder"
            placeholder="custom stakeholder"
          ></b-input>
        </b-field>

        <b-field label="I WOULD LIKE TO">
          <b-input
            type="text"
            value="task"
            password-reveal
            placeholder="task to be completed"
            required
          ></b-input>
        </b-field>

        <b-field label="SO THAT I CAN">
          <b-input
            type="text"
            value="purpose"
            password-reveal
            placeholder="purpose of task"
            required
          ></b-input>
        </b-field>

        <b-field label="TO ACHIEV THE GOAL OF">
          <b-autocomplete
            v-model="benefit"
            placeholder="e.g. benefit of the task"
            :keep-first="false"
            :open-on-focus="true"
            :data="GOALS"
            field="story-benefit"
            ref="autocompleteBenefit"
            @select="option => goalSelected = option">
            <template slot="header">
              <a @click="addGoal">
                <span> Add new goal... </span>
              </a> 
            </template>
          </b-autocomplete>
        </b-field>

        <b-field label="Set a date">
          <b-datepicker
            :show-week-number="showWeekNumber"
            placeholder="Click to select..."
            icon="calendar-today"
          ></b-datepicker>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button class="button is-primary">Add Story</button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    STAKEHOLDERS: Array,
    GOALS: Array
  },

  data() {
    return {
      stakeholder: '',
      stakeholderSelected: null,
      goalSelected: null,
      showWeekNumber: false,
      showCustomStakeholder: false,
      showCustomBenefit: false
    };
  },


  methods: {
    toggleCustomStakeholder: function(){
      showCustomStakeholder = !showCustomStakeholder;
    },

    toggleCustomBenefit: function(){
      showCustomBenefit = !showCustomBenefit;
    },

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


      })
    }
  }

};
</script>
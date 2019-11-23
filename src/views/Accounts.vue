
<template>
  <section>
    <baseHeader></baseHeader>
    
    <main id="main-content">
      <div class="container">

        <section class="section">
          <h1 class="title">Accounts</h1>
          
          <div class="box">
            <b-table
              :data="accounts"
              :columns="columns">
            </b-table>
          </div>
        
          <b-field label="Company Name">
            <b-input
              v-model="companyName"
              type="text"
              name="companyName"
              placeholder=""
            ></b-input>
          </b-field>

          <b-field label="adminUserId">
            <b-input
              v-model="adminUserId"
              type="text"
              name="adminUserId"
              placeholder=""
            ></b-input>
          </b-field>

          <b-field label="billingAddress1">
            <b-input
              v-model="billingAddress1"
              type="text"
              name="billingAddress1"
              placeholder=""
            ></b-input>
          </b-field>

          <b-field label="billingAddress2">
            <b-input
              v-model="billingAddress2"
              type="text"
              name="billingAddress2"
              placeholder=""
            ></b-input>
          </b-field>

          <b-field label="billingAddress3">
            <b-input
              v-model="billingAddress3"
              type="text"
              name="billingAddress3"
              placeholder=""
            ></b-input>
          </b-field>

          <b-field label="billingCity">
            <b-input
              v-model="billingCity"
              type="text"
              name="billingCity"
              placeholder=""
            ></b-input>
          </b-field>

					<b-field label="billingState">
            <b-input
              v-model="billingState"
              type="text"
              name="billingState"
              placeholder=""
            ></b-input>
          </b-field>

					<b-field label="billingZipcode">
            <b-input
              v-model="billingZipcode"
              type="text"
              name="billingZipcode"
              placeholder=""
            ></b-input>
          </b-field>

					<b-field label="billingPhoneNumber">
            <b-input
              v-model="billingPhoneNumber"
              type="text"
              name="billingPhoneNumber"
              placeholder=""
            ></b-input>
          </b-field>

					<b-field label="billingEmail">
            <b-input
              v-model="billingEmail"
              type="text"
              name="billingEmail"
              placeholder=""
            ></b-input>
          </b-field>

					<b-field label="teams">
            <b-input
              v-model="teams"
              type="text"
              name="teams"
              placeholder=""
            ></b-input>
          </b-field>

          <b-button @click="submitNewAccount" type="is-primary">Submit New Account</b-button>

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
      companyName: '',
			adminUserId: '',
			adminUserEmail: '',
			billingAddress1: '',
			billingAddress2: '',
			billingAddress3: '',
			billingCity: '',
			billingState: '',
			billingZipcode: '',
			billingPhoneNumber: '',
			billingEmail: '',
			teams: [],
      columns: [      
        {
          field: 'companyName',
          label: 'Company Name',
        },
        {
          field: 'adminUserId',
          label: 'Admin User ID',
        },
        {
          field: 'adminUserEmail',
          label: 'Admin Email',
        },
        {
          field: 'Address 1',
          label: 'Address 1'
        },
        {
          field: 'Address 2',
          label: 'Address 2'
        },
        {
          field: 'Address 3',
          label: 'Address 3'
        },
        {
          field: 'billingCity',
          label: 'City'
        },
        {
          field: 'billingState',
          label: 'State'
        },
        {
          field: 'billingZipcode',
          label: 'Zip Code'
        },
        {
          field: 'billingPhoneNumber',
          label: 'Phone'
        },
        {
          field: 'billingEmail',
          label: 'Billing Email'
        },
        {
          field: 'teams',
          label: 'Teams'
        }
      ]
    }
  },
  
  computed: {

    accounts: function(){
      let data = this.$store.getters['accounts/getAccounts'];
      //let mappedData = data.map( obj => { return obj.title });

      return data;
    }

  },
  
  methods: {

    submitNewAccount: function(){
      
      this.$store.dispatch('loading/setIsLoading', true);

      let newAccount = {
        companyName: this.companyName,
				adminUserId: this.adminUserId,
				adminUserEmail: this.adminUserEmail,
				billingAddress1: this.billingAddress1,
				billingAddress2: this.billingAddress2,
				billingAddress3: this.billingAddress3,
				billingCity: this.billingCity,
				billingState: this.billingState,
				billingZipcode: this.billingZipcode,
				billingPhoneNumber: this.billingPhoneNumber,
				billingEmail: this.billingEmail,
				teams: this.teams
      };
      this.$store.dispatch('accounts/submitNewAccount', newAccount);
      this.clearForm();
    },

    clearForm: function(){
      this.companyName = '';
			this.adminUserId = '';
			this.adminUserEmail = '';
			this.billingAddress1 = '';
			this.billingAddress2 = '';
			this.billingAddress3 = '';
			this.billingCity = '';
			this.billingState = '';
			this.billingZipcode = '';
			this.billingPhoneNumber = '';
			this.billingEmail = '';
			this.teams = '';
    },




  },

  created(){
    this.$store.dispatch('accounts/getAccountsFromApi');
  }
}
</script>
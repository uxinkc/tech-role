/*
accounts API

companyName: string
adminUserId: string
adminUserEmail: string
billingAddress1: string
billingAddress2: string
billingAddress3: string
billingCity: string
billingState: string
billingZipcode: string
billingPhoneNumber: string
billingEmail: string
teams: array

*/

import firebase from '../firebase/firebase';
import uuidv1 from 'uuid/v1';

export const accountsService = {

  getData(callback) {

    firebase.db.collection('accounts').get().then( data => {
      
      if(data.size > 0) {

        let accounts = [];
        data.docs.forEach( account => {
          accounts.push( account.data() );
        });

        callback( accounts );
        
      } else {
        console.log('No doc exists');
      }

    }).catch( (error) => {
      console.log('catch error:', error);
    });


  },

  submitNewAccount(data, callback){

    let uid = '';
    uid = uuidv1();
    let accountData = {
      companyName: data.companyName,
      adminUserId: data.adminUserId,
      adminUserEmail: data.adminUserEmail,
      billingAddress1: data.billingAddress1,
      billingAddress2: data.billingAddress2,
      billingAddress3: data.billingAddress3,
      billingCity: data.billingCity,
      billingState: data.billingState,
      billingZipcode: data.billingZipcode,
      billingPhoneNumber: data.billingPhoneNumber,
      billingEmail: data.billingEmail,
      teams: data.teams
    };

    firebase.db.collection('accounts')
      .doc(uid)
      .set(accountData)
      .then( data => {

        callback( data );
      
      }).catch( (error) => {
        console.log('catch error', error);
      });
    
  }

}

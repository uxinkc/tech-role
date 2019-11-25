/*
roles API

role: string
desc: string
assocTech: array

*/

import firebase from '../firebase/firebase';
import uuidv1 from 'uuid/v1';

export const rolesService = {

  getData(callback) {

    firebase.db.collection('roles').get().then( data => {
      
      if(data.size > 0) {

        let roles = [];
        data.docs.forEach( role => {
          roles.push( role.data() );
        });

        callback( roles );
        
      } else {
        console.log('No doc exists');
      }

    }).catch( (error) => {
      console.log('catch error:', error);
    });


  },

  submitNewRole(data, callback){

    let uid = '';
    uid = uuidv1();
    let roleData = {
      role: data.role,
      desc: data.desc,
      assocTech: data.assocTech
    };

    firebase.db.collection('roles')
      .doc(uid)
      .set(roleData)
      .then( data => {

        callback( data );
      
      }).catch( (error) => {
        console.log('catch error', error);
      });
    

  }

}

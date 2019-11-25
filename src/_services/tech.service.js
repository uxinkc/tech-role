/*
roles API

tech: string
desc: string
assocRoles: array

*/

import firebase from '../firebase/firebase';
import uuidv1 from 'uuid/v1';

export const techService = {

  getData(callback) {

    firebase.db.collection('tech').get().then( data => {
      
      if(data.size > 0) {

        let tech = [];
        data.docs.forEach( t => {
          tech.push( t.data() );
        });

        callback( tech );
        
      } else {
        console.log('No doc exists');
      }

    }).catch( (error) => {
      console.log('catch error:', error);
    });


  },

  submitNewTech(data, callback){

    let uid = '';
    uid = uuidv1();
    let techData = {
      role: data.tech,
      desc: data.desc,
      assocRoles: data.assocRoles
    };

    firebase.db.collection('tech')
      .doc(uid)
      .set(techData)
      .then( data => {

        callback( data );
      
      }).catch( (error) => {
        console.log('catch error', error);
      });
    

  }

}

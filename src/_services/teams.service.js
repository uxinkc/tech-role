/*
teams API

accountId: string
name: string
members: array
type: string
desc: string

*/

import firebase from '../firebase/firebase';
import uuidv1 from 'uuid/v1';

export const teamsService = {

  getData(callback) {

    firebase.db.collection('teams').get().then( data => {
      
      if(data.size > 0) {

        let teams = [];
        data.docs.forEach( team => {
          teams.push( team.data() );
        });

        callback( teams );
        
      } else {
        console.log('No doc exists');
      }

    }).catch( (error) => {
      console.log('catch error:', error);
    });


  },

  submitNewTeam(data, callback){

    let uid = '';
    uid = uuidv1();
    let teamData = {
      accountId: data.accountId,
      name: data.name,
      members: data.members,
      type: data.type,
      desc: data.desc
    };

    firebase.db.collection('teams')
      .doc(uid)
      .set(teamData)
      .then( data => {

        callback( data );
      
      }).catch( (error) => {
        console.log('catch error', error);
      });

  }

}

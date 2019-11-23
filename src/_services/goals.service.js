/*
goals API

projectId: string
priority: number
type: string
title: string
desc: string
notes: string

*/

import firebase from '../firebase/firebase';
import uuidv1 from 'uuid/v1';

export const goalsService = {

  getData(callback) {

    firebase.db.collection('goals').get().then( data => {
      
      if(data.size > 0) {

        let goals = [];
        data.docs.forEach( goal => {
          goals.push( goal.data() );
        });

        callback( goals );
        
      } else {
        console.log('No doc exists');
      }

    }).catch( (error) => {
      console.log('catch error:', error);
    });


  },

  submitNewGoal(data, callback){

    let uid = '';
    uid = uuidv1();
    let goalData = {
      projectId: data.projectId,
      priority: data.priority,
      type: data.type,
      title: data.title,
      desc: data.desc,
      notes: data.notes
    };

    firebase.db.collection('goals')
      .doc(uid)
      .set(goalData)
      .then( data => {

        callback( data );
      
      }).catch( (error) => {
        console.log('catch error', error);
      });
    

  }

}

/*
stories API

projectId: string
priority: number
title: string
stakeholder: string
task: string
purpose: string
benefit: string
notes: string
dates: array

*/

import firebase from '../firebase/firebase';

export const storiesService = {

  getData(callback) {

    firebase.db.collection('stories').get().then( data => {
      
      if(data.size > 0) {
        let stories = [];
        data.docs.forEach( story => {
          stories.push( story.data() );
        });
        callback( stories );
      } else {
        console.log('No doc exists');
      }

    }).catch( (error) => {
      console.log('catch error:', error);
    });

  },

  submitNewStory(data, callback){

    let uid = '';
    uid = uuidv1();
    let storyData = {
      projectId: data.projectId,
      priority: data.priority,
      title: data.title,
      stakeholder: data.stakeholder,
      task: data.task,
      purpose: data.purpose,
      benefit: data.benefit,
      notes: data.notes,
      dates: data.dates
    };

    firebase.db.collection('stories')
      .doc(uid)
      .set(storyData)
      .then( data => {

        callback( data );
      
      }).catch( (error) => {
        console.log('catch error', error);
      });

  }

}

/*

/// FAKE API

const apiData = {

  stories: [
    {
      uid: 1,
      projectId: 1,
      priority: 1,
      title: 'Search Customers in Region',
      stakeholder: 'Sales Representative',
      task: 'search for customers in my region',
      purpose: 'find customers that I can easily travel to',
      benefit: 'CRM Market Leader',
      notes: 'California customers are currently out of office due to fires.',
      dates: [
        {
          type: 'start',
          label: 'Start Date',
          date: '09/01/2019'
        },
        {
          type: 'end',
          label: 'End Date',
          date: '07/01/2020'
        },
        {
          type: 'release',
          label: 'MVP Release',
          date: '01/01/2020'
        },
        {
          type: 'custom',
          label: 'CES Trade Show',
          date: '01/25/2020'
        }
      ],
      dateCreated: '07/01/2019',
      dateModified: '11/11/2019'
    },
    {
      uid: 2,
      projectId: 1,
      priority: 2,
      title: 'Regional Customer Search Results',
      stakeholder: 'Marketing Staffer',
      task: 'review search results for customers in my region',
      purpose: 'find customers that I can easily travel to',
      benefit: 'Multiple Revenue Streams',
      notes: 'California customers are currently out of office due to fires.',
      dates: [
        {
          type: 'start',
          label: 'Start Date',
          date: '09/01/2019'
        },
        {
          type: 'end',
          label: 'End Date',
          date: '07/01/2020'
        },
        {
          type: 'release',
          label: 'MVP Release',
          date: '01/01/2020'
        },
        {
          type: 'custom',
          label: 'CES Trade Show',
          date: '01/25/2020'
        }
      ],
      dateCreated: '07/01/2019',
      dateModified: '11/11/2019'
    }
  ]
}

export const storiesService = {

  getData (callback) {
    setTimeout(() => callback( apiData ), 1000)
  }

}

*/


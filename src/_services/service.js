/*
roles API

tech: string
desc: string
assocRoles: array

*/

import firebase from '../firebase/firebase';
import uuidv1 from 'uuid/v1';

export const service = {

  cache: {
    tech: { data: [], cached: false },
    roles: { data: [], cached: false }
  },

  getData(fbColl, callback) {

    if(this.cache[fbColl].cached){
      console.log('data from cache');
      callback( this.cache[fbColl].data );
    
    } else {
      console.log('data from Firebase');
      firebase.db.collection(fbColl).get().then( data => {
        
        if(data.size > 0) {

          let arr = [];
          data.docs.forEach( obj => {
            arr.push( obj.data() );
          });

          // cache data
          this.cache[fbColl].data = arr;
          this.cache[fbColl].cached = true;
          // pass data to callback
          //console.log(fbColl, arr)
          callback( arr );
          
        } else {
          console.log('No doc exists');
        }
      }).catch( (error) => {
        console.log('catch error:', error);
      });
    }

  },

  getFakeData(fbColl, callback) {
    let data = apiData[fbColl];
    this.cache[fbColl].data = data;
    this.cache[fbColl].cached = true;
    console.log('data cached for '+fbColl);
    setTimeout( () => callback( data ) ,50);
  },

  sortArray(arr, prop){
    let newArray = arr.sort( function( a, b){
      return a[prop] - b[prop];
    });
    return newArray; 
  },

  getRolesFromTech(str, callback){
    // str e.g. JavaScript
    if(this.cache['roles'].cached){

      let rolesData = this.cache['roles'].data;
      let rData = rolesData.filter( function( role ){
        if( role.assocTech.indexOf(str) > -1 ) return true;
      });
      console.log('tech -> role',rData)
      this.sortArray(rData,'role'); // not working
      callback( rData );

    } else {
      console.log('no cached results data');      
    }
  },

  getTechFromRole(str, callback){
    // str e.g. Frontend Developer
    if(this.cache['tech'].cached){

      let techData = this.cache['tech'].data;
      let tData = techData.filter( function( t ){
        if( t.assocRoles.indexOf(str) > -1 ) return true;
      });

      console.log('role -> tech',tData)
      this.sortArray(tData,'tech'); // not working
      callback( tData );

    } else {
      console.log('no cached results data');      
    }
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

const apiData = {
  roles: 
  [
    {
      role: 'UI/UX Developer',
      desc: 'A programmer that works on technologies related to what you see in a browser.',
      assocTech: [
        'JavaScript',
        'Angular',
        'React',
        'Vue',
        'HTML',
        'CSS',
        'SASS',
        'LESS',
        'Unit Testing',
        'git'
      ]
    },
    {
      role: 'Frontend Developer',
      desc: 'A programmer that works on technologies related to what you see in a browser.',
      assocTech: [
        'JavaScript',
        'Angular',
        'React',
        'Vue',
        'HTML',
        'CSS',
        'SASS',
        'LESS',
        'Unit Testing',
        'Node.js',
        'git'
      ]
    },
    {
      role: 'Backend Developer',
      desc: 'Develops code and technologies that communication between a database and the Frontend of an application.',
      assocTech: [
        'Database',
        'Angular',
        'JavaScript',
        'Vue',
        'MySQL',
        'MSSQL',
        'MongoDB',
        'NoSQL',
        'Docker',
        'Google Firestore',
        'git'
      ]
    }
  ],
  tech: 
  [
    {
      tech: 'JavaScript',
      desc: 'A Frontend programming language that runs in the browser.',
      assocRoles: [
        'Frontend Developer',
        'UI Developer',
        'UI/UX Developer',
        'Web Developer',
        'JavaScript Developer',
        'Full-Stack Developer',
        'Software Engineer',
        'Backend Developer',
        'Enterprise Architect'
      ]
    },
    {
      tech: 'React',
      desc: 'JavaScript Library for frontend web development.',
      assocRoles: [
        'Frontend Developer',
        'UI Developer',
        'UI/UX Developer',
        'User Interface Developer',
        'Web Developer',
        'JavaScript Developer',
        'Full-Stack Developer',
        'Software Engineer',
        'Frontend Architect',
      ]
    },
    {
      tech: 'Progressive Web App',
      desc: 'Technology that allows a User to use an application online and offline.',
      assocRoles: [
        'Frontend Developer',
        'UI Developer',
        'UI/UX Developer',
        'User Interface Developer',
        'Web Developer',
        'JavaScript Developer',
        'Full-Stack Developer',
        'Software Engineer',
        'Frontend Architect',
        'Enterprise Architect'
      ]
    }
  ]
}

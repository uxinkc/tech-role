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

      console.log('used cached data > ', fbColl)
      callback( this.cache[fbColl].data );

    } else {
      
      console.log('call FB > ', fbColl)
      firebase.db.collection(fbColl).get().then( data => {
        
        if(data.size > 0) {

          let arr = [];
          data.docs.forEach( obj => {
            arr.push( obj.data() );
          });

          // cache data
          this.cache[ fbColl ].data = arr;
          this.cache[fbColl].cached = true;
          // pass data to callback
          callback( arr );
          
        } else {
          console.log('No doc exists');
        }
      }).catch( (error) => {
        console.log('catch error:', error);
      });
    }

  },

  getResults(coll, str, callback){

    if(this.cache[coll].cached){

      let arr = this.cache[ coll ].data;
      console.log(coll +' arr ? ', arr)
      let roles = arr.filter( function( obj ){
        if(str == obj.role) return true;
      });

      console.log('roles',roles)
      let assocTech = [];
      roles.forEach( role => {
          assocTech.concat(role.assocTech);
        }
      )
      
      //( roles ) => roles.assocTech.filter((v,i) => roles.assocTech.indexOf(v) === i)

      console.log('new >',assocTech)


      callback( assocTech );

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

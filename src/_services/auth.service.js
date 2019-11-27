

import firebase from '../firebase/firebase';

export const authService = {

  user: {},
  error: {},

  getLogin(callback) {
    
    firebase.auth.signInWithPopup( firebase.provider ).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      let token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;
      // ...
      callback(user)
    }).catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
      // ...
      console.log('Whoops', error.message)
      callback(error);
    });
    /*
    firebase.auth.signInWithRedirect( firebase.provider );
    firebase.auth.getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        let token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      user = result.user;
      
    }).then( function(){
    
      callback(user);
    
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log('error',error)
      callback(error);
    });
    */

  },

  getLogout(callback){
    console.log('kicked');
    firebase.auth.signOut().then(function() {      
      // Sign-out successful.
      callback({loggedIn: false});
    }).catch(function(error) {
      // An error happened.
      callback({loggedIn: true, error: error});
    });
  }

}

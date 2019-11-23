
import firebase from '../firebase/firebase';

export const storyLabelsService = {

  getData(callback) {

    let storyLabels = firebase.db.collection('storyLabels');
    
    storyLabels.get().then( data => {
      if(data.size > 0) {
        data.docs.forEach( labels => {
          callback( labels.data() );
        });
      } else {
        console.log('No doc exists');
      }
    }).catch( (error) => {
      console.log('catch error:', error);
    });

  }

}

/*
scrape API

https://jobs.github.com/positions.json?location=new+york

*/

import firebase from '../firebase/firebase';
import uuidv1 from 'uuid/v1';

import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError, map } from 'rxjs/operators';

const URL = 'https://jobs.github.com/positions.json?location=new+york';
//const URL = 'https://api.linkedin.com/v2/titles/{id}?locale=en_US';
const proxy = 'https://cors-anywhere.herokuapp.com/';

const simplifyUserData = (job) => {
    return {
        title: job.name,
        description: job.description,
    }
}


export const scrapeService = {

  getJobsGithub( callback ){

    const jobs$ = fromFetch(proxy + URL).pipe(
      switchMap( response => {
        if (response.ok) {
          // OK return data
          let data = response.json();
          return data;
        } else {
          // Server is returning a status requiring the client to try something else.
          return of({ error: true, message: `Error ${response.status}` });
        }
      }),
      catchError(err => {
        // Network or other error, handle appropriately
        console.error(err);
        return of({ error: true, message: err.message })
      })
    );

    jobs$.subscribe({
      next: results => callback( results ),
      complete: () => console.log('jobs done loading'),
    })

    
  },

  getData(callback) {

    // THIS SHOULD BE DONE ON THE SERVER!!

    // get external API data

    // parse data and cleanse

    // add data to firebase 
    

  }

};

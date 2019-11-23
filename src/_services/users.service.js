/////// FAKE API ///////

/* const users = [
  { name: 'John Stevens', email: 'john.stevens@domain.com' },
  { name: 'Mark Majors', email: 'mark.majors@domain.com' }
]; */

import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError, map } from 'rxjs/operators';

const URL = 'https://jsonplaceholder.typicode.com/users';

const simplifyUserData = (user) => {
    return {
        name: user.name,
        email: user.email,
    }
}

export const service = {

  /*
  getAllUsers( callback ){
    //setTimeout( () => callback( users ) ,50);
  }
  */

  getAllUsers( callback ){

    const users$ = fromFetch(URL).pipe(
      switchMap( response => {
        if (response.ok) {
          // OK return data
          return response.json();
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

    users$.subscribe({
      next: results => callback( results ),
      complete: () => console.log('users done loading'),
    })

    
  }
  
};
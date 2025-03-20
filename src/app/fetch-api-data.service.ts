import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const apiUrl = 'YOUR_HOSTED_API_URL_HERE/';


//Declaring the api url that will provide data for the client app

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {


  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }


 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }


  // User Login
public userLogin(userDetails:any): Observable<any> {
  return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
  );
}

//get all movies
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }) }).pipe(
        map(this.extractResponseData), 
        catchError(this.handleError)
      );
    }

  // Get One Movie
  public getOneMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(`${apiUrl}movies/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


    // Get Director Info
    public getDirector(directorName: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get<any>(`${apiUrl}directors/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }
  

  // Get Genre Info
  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(`${apiUrl}genres/${genreName}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get User Info
  public getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(`${apiUrl}users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    // Get User's Favorite Movies
    public getFavoriteMovies(username: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.get<any>(`${apiUrl}users/${username}/movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }
  
    // Add a Movie to Favorite Movies
    public addFavoriteMovie(username: string, movieId: string): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.post<any>(`${apiUrl}users/${username}/movies/${movieId}`, {}, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        })
      }).pipe(
        catchError(this.handleError)
      );
    }

    // Edit User Info
  public editUser(username: string, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put<any>(`${apiUrl}users/${username}`, userDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError)
    );
  }


  //test 
  // Delete User
  public deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete<any>(`${apiUrl}users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a Movie from Favorite Movies
  public deleteFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete<any>(`${apiUrl}users/${username}/movies/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError)
    );
  }




  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  
private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));

  }

 
}


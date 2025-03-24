import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const apiUrl = 'https://movie-api-amy-d13640458d52.herokuapp.com/';


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
      const encodedName = encodeURIComponent(directorName);
      return this.http.get<any>(`${apiUrl}movies/director/${encodedName}`, {
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
    const encodedName = encodeURIComponent(genreName);
    return this.http.get<any>(`${apiUrl}genre/${encodedName}`, {
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

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 200 && typeof error.error === 'string') {
      // Treat plain text 200 as a success, not an error
      return throwError(() => ({
        fakeSuccess: true,
        message: 'Delete success with plain text response'
      }));
    }
  
    if (error.status === 422) {
      console.error('Validation error:', JSON.stringify(error.error));
    } else {
      console.error('Unexpected error:', error);
    }
  
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  
 
}


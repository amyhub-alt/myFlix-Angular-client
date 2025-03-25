import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const apiUrl = 'https://movie-api-amy-d13640458d52.herokuapp.com/';


/**
 * Handles all HTTP requests to the myFlix API.
 * Includes user registration, login, movie data, and user profile actions.
 */
@Injectable({
  providedIn: 'root'
})

/**
 * The FetchApiDataService provides methods to interact with the REST API,
 * including authentication, movie retrieval, user management, and favorite handling.
 */
export class FetchApiDataService {


  /**
 * Creates an instance of FetchApiDataService.
 * @param http The Angular HttpClient used for API requests
 */
  constructor(private http: HttpClient) {
  }


/**
 * Sends a new user's data to the API to register an account.
 * @param userDetails Object containing Username, Password, Email, and optional Birthday
 * @returns Observable with the server response
 */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }


/**
 * Sends login credentials to the API and receives a token upon success.
 * @param userDetails Object containing Username and Password
 * @returns Observable with user info and token
 */
public userLogin(userDetails:any): Observable<any> {
  return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
  );
}


/**
 * Retrieves a list of all movies from the API.
 * Requires a valid JWT token.
 * @returns Observable containing an array of movie objects
 */
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


/**
 * Retrieves details for a single movie by its ID.
 * @param movieId The movie's unique identifier
 * @returns Observable with the movie data
 */
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


/**
 * Retrieves data about a specific director by name.
 * @param directorName The full name of the director
 * @returns Observable with director info (bio, birth, death)
 */
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
    


/**
 * Retrieves details about a specific genre by name.
 * @param genreName The name of the genre
 * @returns Observable with genre description
 */
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
  

/**
 * Retrieves the current user's profile by username.
 * @param username The username of the logged-in user
 * @returns Observable with user object
 */
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


/**
 * Retrieves a list of the user's favorite movies.
 * @param username The user's username
 * @returns Observable with an array of favorite movies
 */
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
/**
 * Adds a movie to the user's list of favorites.
 * @param username The user's username
 * @param movieId The ID of the movie to add
 * @returns Observable with updated user data
 */
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



/**
 * Updates the user's profile information.
 * @param username The user's username
 * @param userDetails Object with updated Email, Birthday, or Password
 * @returns Observable with the updated user object
 */
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


/**
 * Deletes the user's account from the system.
 * @param username The user's username
 * @returns Observable with the API's response
 */
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


/**
 * Removes a movie from the user's list of favorites.
 * @param username The user's username
 * @param movieId The ID of the movie to remove
 * @returns Observable with updated user data
 */
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




/**
 * Extracts the body from the HTTP response.
 * @param res The response object
 * @returns The response body or empty object
 */
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }


  /**
 * Handles HTTP errors from API requests.
 * Logs appropriate messages and returns a standardized error object.
 * @param error The HttpErrorResponse object
 * @returns An observable error to be handled by the subscriber
 */
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


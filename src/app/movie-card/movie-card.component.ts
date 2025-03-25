import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';


/**
 * Displays a grid of movie cards with options to view details, add/remove favorites, and navigate to the user profile.
 * Handles fetching all movies and the user's favorite movie list.
 */
@Component({
  selector: 'app-movie-card',
  standalone: false,
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

/**
 * The MovieCardComponent handles movie display, favorite toggling, and user actions like viewing profile and logging out.
 */
export class MovieCardComponent {
  /**
   * Array of all movies fetched from the API.
   */
  movies: any[] = [];

  /**
   * The currently logged-in user's data.
   */
  userData: any = {};

  /**
   * Array of the user's favorite movie IDs.
   */
  favoriteMovieIds: string[] = [];

  
  /**
   * Injects required services for API access, dialog handling, and routing.
   * @param fetchApiData Service for accessing API endpoints
   * @param dialog Material dialog service for opening detail popups
   * @param router Angular router for navigation
   */
  constructor(public fetchApiData: FetchApiDataService,
  public dialog: MatDialog,
  private router: Router
  ) { }

    /**
   * Lifecycle hook that runs on component initialization.
   * Fetches the list of all movies and the user's favorite movies.
   */
  ngOnInit(): void {
    // Get all movies
    this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
      this.movies = movies;
    });


    // Get user and favorite movie IDs from localStorage + API
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userData = JSON.parse(storedUser);
      this.fetchApiData.getUser(this.userData.Username).subscribe((res: any) => {
        this.favoriteMovieIds = res.FavoriteMovies || [];
      });
    }
  }


    /**
   * Opens a dialog box to display additional movie information (genre, director, or synopsis).
   * @param movie The movie object to display in the dialog
   * @param section The section of the movie to show ('genre', 'director', or 'synopsis')
   */
  openDialog(movie: any, section: string): void {
    localStorage.setItem('selectedMovie', JSON.stringify(movie));
    localStorage.setItem('dialogSection', section);
    this.dialog.open(DialogContentComponent);
  }


    /**
   * Navigates the user to their profile page.
   */
  goToProfile(): void {
    this.router.navigate(['profile']);
  }


    /**
   * Logs out the user by clearing localStorage and redirecting to the welcome page.
   */
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }


    /**
   * Checks if a movie is in the user's list of favorites.
   * @param movieId The ID of the movie
   * @returns Whether the movie is a favorite
   */
  isFavorite(movieId: string): boolean {
    return this.favoriteMovieIds.includes(movieId);
  }

  
    /**
   * Adds or removes a movie from the user's list of favorites based on current state.
   * @param movieId The ID of the movie to toggle
   */
  toggleFavorite(movieId: string): void {
    const username = this.userData.Username;

    if (this.isFavorite(movieId)) {
      this.fetchApiData.deleteFavoriteMovie(username, movieId).subscribe((res: any) => {
        this.favoriteMovieIds = res.FavoriteMovies;
      });
    } else {
      this.fetchApiData.addFavoriteMovie(username, movieId).subscribe((res: any) => {
        this.favoriteMovieIds = res.FavoriteMovies;
      });
    }
  }
  
}



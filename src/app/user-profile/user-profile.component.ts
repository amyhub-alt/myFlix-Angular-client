import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Displays the user profile view, allowing the user to update their info, manage favorite movies,
 * and delete their account. Also supports logout and navigation.
 */
@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

/**
 * The UserProfileComponent provides the UI and logic for user profile management,
 * including viewing/updating user details, displaying favorite movies, and account deletion.
 */
export class UserProfileComponent implements OnInit {
   /**
   * The currently logged-in user's data.
   */
   userData: any = {};

   /**
    * List of the user's favorite movies.
    */
   favoriteMovies: any[] = [];
 
   /**
    * The user's birthday formatted as YYYY-MM-DD for display.
    */
   formattedBirthday: string = '';
 
  


  /**
   * Injects required services for API communication, routing, and showing snack bar messages.
   * Also attempts to load user data from localStorage safely.
   * @param fetchApiData Service for accessing API endpoints
   * @param router Angular router for page navigation
   * @param snackBar Material snackbar for feedback messages
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    private snackBar: MatSnackBar
  ) {
    // SAFELY parse localStorage data
    try {
      this.userData = JSON.parse(localStorage.getItem('user') || '{}');
    } catch (e) {
      console.error('Error parsing user data:', e);
      this.router.navigate(['welcome']);
    }
  }


    /**
   * Lifecycle hook that runs on component initialization.
   * Fetches user data from the API.
   */
  ngOnInit(): void {
    this.getUser();
    
  }

    /**
   * Retrieves the latest user information from the API,
   * updates localStorage, and triggers loading of favorite movies.
   */
  getUser(): void {
    this.fetchApiData.getUser(this.userData.Username).subscribe((res: any) => {
      this.userData = res;
      this.formattedBirthday = res.Birthday ? res.Birthday.split('T')[0] : '';
      localStorage.setItem('user', JSON.stringify(this.userData));
      this.getFavoriteMovies();
    });
  }
  
  
  /**
   * Filters the full movie list to match the user's favorite movie IDs.
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
      this.favoriteMovies = movies.filter(movie =>
        this.userData.FavoriteMovies?.includes(movie._id)
      );
    });
  }


  /**
   * Removes a movie from the user's list of favorites and refreshes the displayed list.
   * @param movieId The ID of the movie to remove
   */
  removeFromFavorite(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(this.userData.Username, movieId).subscribe((res: any) => {
      this.userData.FavoriteMovies = res.FavoriteMovies;
      this.getFavoriteMovies();
    });
  }


    /**
   * Logs out the user by clearing localStorage and navigating to the welcome screen.
   */
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }


    /**
   * Navigates back to the main movie list view.
   */
  backToMovies(): void {
    this.router.navigate(['movies']);
  }


  /**
   * Sends updated user profile data to the API.
   * Updates localStorage and displays feedback messages based on the result.
   */
  updateUser(): void {
    const updatedUser: any = {
      Username: this.userData.Username,
      Email: this.userData.Email,
      Birthday: this.formattedBirthday
    };

    console.log('Sending updated user:', updatedUser); 
  
    this.fetchApiData.editUser(this.userData.Username, updatedUser).subscribe({
      next: (res: any) => {
        if (!res) {
          console.log('Error: Update unsuccessful', res);
          this.snackBar.open('Profile not updated!', 'Close', { duration: 3000 });
          return;
        }
        
        this.userData = res;
        this.formattedBirthday = res.Birthday ? res.Birthday.split('T')[0] : '';
        localStorage.setItem('user', JSON.stringify(res));

      
      this.snackBar.open('Profile updated successfully!', 'Close', {
        duration: 3000
      });
    },
    error: (err) => {
      console.error('Error updating user:', err);
      this.snackBar.open('Something went wrong.', 'Close', {
        duration: 3000
      });
    }
  });
}


  /**
   * Prompts the user to confirm account deletion.
   * If confirmed, deletes the user account through the API and navigates back to the welcome screen.
   * Handles both successful and failed deletion attempts.
   */
deleteUser(): void {
  const confirmed = window.confirm(
    'Are you sure you want to delete your account? This action cannot be undone.'
  );

  if (confirmed) {
    this.fetchApiData.deleteUser(this.userData.Username).subscribe({
      next: () => {
        this.snackBar.open('Account deleted. Goodbye! 😢', 'Close', { duration: 3000 });
        localStorage.clear();
        this.router.navigate(['welcome']);
      },
      error: (err) => {
        if (err?.fakeSuccess) {
          // Handle the fake success case we manually triggered
          console.warn('Handled 200 plain text as success:', err.message);
          this.snackBar.open('Account deleted. Goodbye! 😢', 'Close', { duration: 3000 });
          localStorage.clear();
          this.router.navigate(['welcome']);
        } else {
          console.error('Error deleting account:', err);
          this.snackBar.open('Something went wrong. Please try again.', 'Close', { duration: 3000 });
        }
      }
    });
  }
}




}
  
  



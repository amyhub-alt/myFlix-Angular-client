import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';

/**
 * The root component of the myFlix Angular app.
 * Contains methods to open registration, login, and movie dialog components.
 */
@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

/**
 * The AppComponent serves as the main application shell.
 * It provides UI actions to launch modals for user signup, login, and a movie view.
 */
export class AppComponent {
/**
 * The title of the Angular app.
 */
title = 'myFlix-Angular-client';

/**
 * Injects the Angular Material Dialog service for opening components in modal windows.
 * @param dialog Material dialog service used for modal interactions
 */
  constructor(public dialog: MatDialog) { }



/**
 * Opens the user registration form in a modal dialog.
 */
openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
// Assigning the dialog a width
    width: '280px'
    });
    
  }

/**
 * Opens the user login form in a modal dialog.
 */
  openLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }

  /**
 * Opens the movie card component in a modal dialog.
 */
  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px'
    });
  }
  
}
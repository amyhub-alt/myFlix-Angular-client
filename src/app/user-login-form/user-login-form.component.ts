import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * A form component that handles user login.
 * Submits the user's credentials to the API and manages success or failure responses.
 */
@Component({
  selector: 'app-user-login-form',
  standalone: false,
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

/**
 * The UserLoginFormComponent allows users to log in by entering their username and password.
 * On successful login, stores user info and token in localStorage, shows a snackbar, and redirects to the movies page.
 */
export class UserLoginFormComponent implements OnInit {
   /**
   * Object bound to the login form inputs.
   * Contains the username and password entered by the user.
   */
   @Input() userData = { Username: '', Password: '' };


     /**
   * Injects required services and dependencies.
   * @param fetchApiData Service for sending login requests to the API
   * @param dialogRef Reference to the login dialog
   * @param snackBar Material snackbar for showing status messages
   * @param router Angular router for navigation after login
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router 
  ) {}


    /**
   * Lifecycle hook that runs when the component is initialized.
   * Currently does not perform any actions.
   */
  ngOnInit(): void {}


    /**
   * Sends the user's login credentials to the API.
   * On success, stores user data and token in localStorage, closes the dialog, shows a success message, and navigates to the movies page.
   * On failure, shows an error message in a snackbar.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (result) => {
        console.log('Login success:', result);
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.dialogRef.close();
        this.snackBar.open('Login successful!', 'OK', { duration: 2000 });
        this.router.navigate(['movies']);
      },
      error: (error) => {
        console.error('Login error:', error);
        this.snackBar.open('Login failed. Check your credentials.', 'OK', { duration: 3000 });
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';


/**
 * The landing page component for the app.
 * Offers options for user registration and login by opening corresponding dialog components.
 */
@Component({
  selector: 'app-welcome-page',
  standalone: false,
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})

/**
 * The WelcomePageComponent handles initial user interaction.
 * Provides methods to open the login and registration forms in modal dialogs.
 */
export class WelcomePageComponent implements OnInit {

  /**
 * Injects the Material Dialog service to open modal windows.
 * @param dialog Material dialog service used to open login and registration components
 */
  constructor(public dialog: MatDialog) { }

  /**
 * Lifecycle hook that runs when the component is initialized.
 * Currently performs no initialization logic.
 */
  ngOnInit(): void {
  }

  /**
 * Opens the user registration dialog.
 * Displays the UserRegistrationFormComponent in a modal window.
 */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
 * Opens the user login dialog.
 * Displays the UserLoginFormComponent in a modal window.
 */
openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}
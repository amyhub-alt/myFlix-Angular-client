import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';


/**
 * A form component that handles user registration.
 * Collects user details and sends them to the API to create a new account.
 */
@Component({
  selector: 'app-user-registration-form',
  standalone: false,
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})

/**
 * The UserRegistrationFormComponent allows users to register by submitting a form
 * with username, password, email, and optional birthday. Displays success or error messages.
 */
export class UserRegistrationFormComponent implements OnInit {
 /**
 * Object bound to the registration form inputs.
 * Contains the user's chosen username, password, email, and birthday.
 */
@Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };


/**
 * Injects required services for API access, dialog handling, and displaying snack bar messages.
 * @param fetchApiData Service for sending registration data to the API
 * @param dialogRef Reference to the registration dialog
 * @param snackBar Material snackbar for user feedback
 */
constructor(
    public fetchApiData: FetchApiDataService, 
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }


    /**
 * Lifecycle hook that runs when the component is initialized.
 * Currently does not perform any actions.
 */
ngOnInit(): void {
}


/**
 * Registers a new user by sending their data to the API.
 * Validates required fields before sending. Closes the dialog on success and shows feedback messages.
 */
registerUser(): void {
  const { Username, Password, Email } = this.userData;

  if (!Username || !Password || !Email) {
    this.snackBar.open('Please fill out all required fields.', 'OK', {
      duration: 3000
    });
    return;
  }

  console.log('Submitting user:', this.userData);

  this.fetchApiData.userRegistration(this.userData).subscribe({
    next: (result) => {
      this.dialogRef.close(); // Close modal on success
      console.log('Registration successful:', result);
      this.snackBar.open('Registration successful!', 'OK', {
        duration: 2000
      });
    },
    error: (error) => {
      console.error('Registration error:', error);
      const errorMsg =
        error?.error?.message || 'Something went wrong. Please try again.';
      this.snackBar.open(errorMsg, 'OK', {
        duration: 3000
      });
    }
  });
}
}


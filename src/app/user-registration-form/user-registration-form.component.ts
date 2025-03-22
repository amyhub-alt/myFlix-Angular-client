import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  standalone: false,
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})

export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

constructor(
    public fetchApiData: FetchApiDataService, 
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
}

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


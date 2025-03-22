import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  standalone: false,
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router 
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (result) => {
        console.log('Login success:', result);
        localStorage.setItem('user', result.user.Username);
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

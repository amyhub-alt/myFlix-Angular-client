import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userData: any = {};
  favoriteMovies: any[] = [];
  formattedBirthday: string = '';
  



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

  ngOnInit(): void {
    this.getUser();
    
  }

  getUser(): void {
    this.fetchApiData.getUser(this.userData.Username).subscribe((res: any) => {
      this.userData = res;
      this.formattedBirthday = res.Birthday ? res.Birthday.split('T')[0] : '';
      localStorage.setItem('user', JSON.stringify(this.userData));
      this.getFavoriteMovies();
    });
  }
  
  

  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
      this.favoriteMovies = movies.filter(movie =>
        this.userData.FavoriteMovies?.includes(movie._id)
      );
    });
  }



  removeFromFavorite(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(this.userData.Username, movieId).subscribe((res: any) => {
      this.userData.FavoriteMovies = res.FavoriteMovies;
      this.getFavoriteMovies();
    });
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }

  backToMovies(): void {
    this.router.navigate(['movies']);
  }

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
}
  
  



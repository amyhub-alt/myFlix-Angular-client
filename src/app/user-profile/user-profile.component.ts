import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userData: any = {};
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router
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
      localStorage.setItem('user', JSON.stringify(this.userData));
      this.getFavoriteMovies();
    }, (err) => {
      console.error('Error fetching user:', err);
      this.router.navigate(['welcome']);
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
      this.favoriteMovies = movies.filter(movie =>
        this.userData.FavoriteMovies?.includes(movie._id)
      );
    });
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.userData.Username, this.userData).subscribe((res: any) => {
      alert('Profile updated!');
      this.userData = res;
      localStorage.setItem('user', JSON.stringify(res));
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

  
  
}

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';



@Component({
  selector: 'app-movie-card',
  standalone: false,
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  userData: any = {};
  favoriteMovieIds: string[] = [];
  

  constructor(public fetchApiData: FetchApiDataService,
  public dialog: MatDialog,
  private router: Router
  ) { }

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

  openDialog(movie: any, section: string): void {
    localStorage.setItem('selectedMovie', JSON.stringify(movie));
    localStorage.setItem('dialogSection', section);
    this.dialog.open(DialogContentComponent);
  }

  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }

  isFavorite(movieId: string): boolean {
    return this.favoriteMovieIds.includes(movieId);
  }

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



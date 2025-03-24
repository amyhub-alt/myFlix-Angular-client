import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-content',
  standalone: false,
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss']
})
export class DialogContentComponent implements OnInit {
  movie: any = {};
  section: string = '';
  genreDetails: any = {};
  directorDetails: any = {};

  constructor(
    private fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<DialogContentComponent>
  ) {}

  ngOnInit(): void {
    this.movie = JSON.parse(localStorage.getItem('selectedMovie') || '{}');
    this.section = localStorage.getItem('dialogSection') || '';
    localStorage.removeItem('selectedMovie');
    localStorage.removeItem('dialogSection');

 

    if (this.section === 'genre' && this.movie.Genre?.Name) {
      this.fetchApiData.getGenre(this.movie.Genre.Name).subscribe(res => {
        
        this.genreDetails = res;
      });
    }

    if (this.section === 'director' && this.movie.Director?.Name) {
      this.fetchApiData.getDirector(this.movie.Director.Name).subscribe(res => {
       
        this.directorDetails = res;
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
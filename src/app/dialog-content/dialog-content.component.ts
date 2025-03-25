import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';

/**
 * Displays content inside a dialog box for genre, director, or movie synopsis details.
 * Retrieves the selected movie and dialog section from localStorage and fetches related data from the API.
 */
@Component({
  selector: 'app-dialog-content',
  standalone: false,
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss']
})

/**
 * The DialogContentComponent handles displaying additional information in a modal dialog.
 * It supports showing genre details, director details, or synopsis based on user interaction.
 */
export class DialogContentComponent implements OnInit {
  /**
   * The selected movie object, retrieved from localStorage.
   */
  movie: any = {};

  /**
   * The type of information to display in the dialog ('genre', 'director', or 'synopsis').
   */
  section: string = '';

  /**
   * Genre details retrieved from the API.
   */
  genreDetails: any = {};

  /**
   * Director details retrieved from the API.
   */
  directorDetails: any = {};

  /**
   * Creates an instance of DialogContentComponent.
   * @param fetchApiData Service used to fetch genre and director data
   * @param dialogRef Reference to the open dialog
   */
  constructor(
    private fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<DialogContentComponent>
  ) {}

    /**
   * Lifecycle hook that runs on component initialization.
   * Loads the selected movie and section from localStorage and fetches data from the API accordingly.
   */
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

    /**
   * Closes the dialog box!
   */
  closeDialog(): void {
    this.dialogRef.close();
  }
}
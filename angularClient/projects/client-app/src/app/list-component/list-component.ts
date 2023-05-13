import { Component } from '@angular/core';
import { MovieService } from 'projects/client-lib';

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.html',
  styleUrls: ['./list-component.css']
})
export class ListComponent {

  movies$ = this.movieService.findAllMovies();

  constructor(private movieService: MovieService){}
}

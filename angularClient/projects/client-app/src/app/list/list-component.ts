import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'projects/client-lib';

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.html',
  styleUrls: ['./list-component.css']
})
export class ListComponent {

  movies$ = this.movieService.findAllMovies();

  constructor(private movieService: MovieService, private router: Router){}

  goToMovie(id?: number) {
      this.router.navigate(['/detail', id]);
      return false;
  }
}
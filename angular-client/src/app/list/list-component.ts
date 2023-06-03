import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService, UserService } from 'top-movies-client-api';

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.html',
  styleUrls: ['./list-component.css']
})
export class ListComponent {

  isLoggedIn = false;

  movies$ = this.movieService.findAllMovies();

  constructor(private movieService: MovieService, private router: Router, private userService: UserService){
    localStorage.getItem("isLoggedIn") === "true" ? this.isLoggedIn = true : this.isLoggedIn = false;
  }

  goToMovie(id?: number) {
      this.router.navigate(['/detail', id]);
      return false;
  }

  logout() {
    this.userService.logoutUser();
    localStorage.clear();
    this.isLoggedIn = false;
  }
}

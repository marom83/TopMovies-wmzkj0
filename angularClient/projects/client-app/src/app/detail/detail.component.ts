import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie, MovieService } from 'projects/client-lib';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  
  movie: Movie = {title: '', description: '', cast: ''};
  id?: number;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id > 0) {
      this.movieService.getMovieById(this.id).subscribe( response => {
        this.movie = response;
      });
    }
  }

  deleteMovie() {
    if (this.id)
      this.movieService.deleteMovie(this.id).subscribe(response=> {
        this.router.navigateByUrl("");
      });
  }

  saveMovie() {
    if (this.id && this.id > 0) {
      this.movieService.updateMovie(this.id, this.movie.title, this.movie.description, this.movie.cast).subscribe();
    } else 
      this.movieService.addMovie(this.movie).subscribe();
  }
}

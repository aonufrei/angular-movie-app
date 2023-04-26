import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {UserPropertiesService} from "../services/user-properties.service";
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Like} from '../common/Likes'
import {MovieService} from "../services/movie.service";
import {LikeService} from "../services/like.service";

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss']
})
export class MoviesPageComponent implements OnInit, OnDestroy {

  moviesView = this.userProperties.getSelectedMovieViewOptionOnRegular()

  destroyed = new Subject<void>();
  columnAmount: number = 1;

  displayColumnAmount = new Map([
    [Breakpoints.XSmall, 1],
    [Breakpoints.Small, 2],
    [Breakpoints.Medium, 4],
    [Breakpoints.Large, 5],
    [Breakpoints.XLarge, 6],
  ]);

  constructor(public userProperties: UserPropertiesService,
              public movieService: MovieService,
              public likeService: LikeService,
              private breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.columnAmount = this.displayColumnAmount.get(query) ?? 1;
          }
        }
      });
  }

  ngOnInit(): void {
    this.moviesView = this.userProperties.getSelectedMovieViewOptionOnRegular()
  }

  onViewOptionChanged(option: string) {
    this.moviesView = option
    this.userProperties.setSelectedMovieViewRegular(option)
  }

  onMovieLikedOrDislike(id: number) {
    this.likeService.likeOrDislike({ userId: 1, movieId: id})
  }

  onMovieDelete(id: number) {
    this.movieService.removeMovie(id)
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

}

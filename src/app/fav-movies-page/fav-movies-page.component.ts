import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {UserPropertiesService} from "../services/user-properties.service";
import {takeUntil} from "rxjs/operators";
import {LikeService} from "../services/like.service";
import {MovieService} from "../services/movie.service";

@Component({
  selector: 'app-fav-movies-page',
  templateUrl: './fav-movies-page.component.html',
  styleUrls: ['./fav-movies-page.component.scss']
})
export class FavMoviesPageComponent implements OnInit, OnDestroy{

  moviesView = this.userProperties.getSelectedMovieViewOptionOnFavorites()

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
    this.moviesView = this.userProperties.getSelectedMovieViewOptionOnFavorites()
  }

  onViewOptionChanged(option: string) {
    this.moviesView = option
    this.userProperties.setSelectedMovieViewOption(option)
  }

  onMovieLikedOrDislike(id: number) {
    this.likeService.likeOrDislike({ userId: 1, movieId: id})
  }


  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }


}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {UserPropertiesService} from "../services/user-properties.service";
import {takeUntil} from "rxjs/operators";
import {LikeService} from "../services/like.service";
import {MovieService} from "../services/movie.service";
import {Movie} from "../common/Movies";
import {AuthService} from "../services/auth.service";
import {SortMovieField, SortMovieOption, SortOrder} from "../common/ListOptions";
import {SELECTED_MOVIE_VIEW_FAVORITE, SELECTED_SORTING_FAVORITE} from "../common/UserPropertiesConstants";

@Component({
  selector: 'app-fav-movies-page',
  templateUrl: './fav-movies-page.component.html',
  styleUrls: ['./fav-movies-page.component.scss']
})
export class FavMoviesPageComponent implements OnInit, OnDestroy{

  search = ''
  sorting: SortMovieOption = this.userProperties.getSortingFromParam(SELECTED_SORTING_FAVORITE)

  moviesView = this.userProperties.getMovieViewOption(SELECTED_MOVIE_VIEW_FAVORITE)
  movieRetrieval = () => this.movieService.getUserFavoriteMovies(this.authService.currentUser.id)

  movies: Movie[] = this.movieRetrieval()

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
              private authService: AuthService,
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
    this.moviesView = this.userProperties.getMovieViewOption(SELECTED_MOVIE_VIEW_FAVORITE)
    this.sorting = this.userProperties.getSortingFromParam(SELECTED_SORTING_FAVORITE)
  }

  onViewOptionChanged(option: string) {
    this.moviesView = option
    this.userProperties.setStringParam(SELECTED_MOVIE_VIEW_FAVORITE, option)
  }

  onMovieLikedOrDislike(id: number) {
    const userId = this.authService.currentUser.id
    this.likeService.likeOrDislike({ userId, movieId: id})
    this.onSearch(this.search)
  }

  onSearch(query: string) {
    this.search = query
    this.movies = this.movieService.searchForMovie(this.movieRetrieval, query, this.sorting)
  }

  onSortingChanged(sorting: SortMovieOption) {
    this.sorting = sorting
    this.onSearch(this.search)
    this.userProperties.setSortingParam(SELECTED_SORTING_FAVORITE, sorting)
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }


}

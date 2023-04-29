import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserPropertiesService} from "../services/user-properties.service";
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MovieService} from "../services/movie.service";
import {LikeService} from "../services/like.service";
import {Movie} from "../common/Movies";
import {AuthService} from "../services/auth.service";
import {SortMovieOption} from "../common/ListOptions";
import {SELECTED_MOVIE_VIEW_REGULAR, SELECTED_SORTING_REGULAR} from "../common/UserPropertiesConstants";
import {CreateMovieDialogComponent} from "../create-movie-dialog/create-movie-dialog.component";
import {MovieDialogType} from "../common/MovieDialogData";
import {MatDialog} from "@angular/material/dialog";
import {UserRole} from "../common/User";

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss']
})
export class MoviesPageComponent implements OnInit, OnDestroy {

  search = ''
  moviesView = this.userProperties.getMovieViewOption(SELECTED_MOVIE_VIEW_REGULAR)
  sorting: SortMovieOption = this.userProperties.getSortingFromParam(SELECTED_SORTING_REGULAR)

  currentUser = this.authService.currentUser

  showEdit: boolean = this.authService.getEditMoviePermissionFor(this.currentUser)
  showMark = this.authService.getMarkMoviePermissionFor(this.currentUser)

  movieRetrievalFunction = () => this.movieService.getMoviesForUser(this.authService.currentUser.id)

  movies: Movie[] = this.movieRetrievalFunction();

  destroyed = new Subject<void>();
  columnAmount: number = 1;

  displayColumnAmount = new Map([
    [Breakpoints.XSmall, 1],
    [Breakpoints.Small, 2],
    [Breakpoints.Medium, 4],
    [Breakpoints.Large, 4],
    [Breakpoints.XLarge, 5],
  ]);

  constructor(public dialog: MatDialog,
              public userProperties: UserPropertiesService,
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
    this.moviesView = this.userProperties.getMovieViewOption(SELECTED_MOVIE_VIEW_REGULAR)
    this.sorting = this.userProperties.getSortingFromParam(SELECTED_SORTING_REGULAR)
    this.movieService.getMoviesObservable().subscribe(movies => {
      this.onSearch(this.search)
    })
    this.authService.getUserObserver().subscribe(() => {
      this.currentUser = this.authService.currentUser
      this.defineButtonsPermission()
      this.onSearch(this.search)
    })
  }

  onViewOptionChanged(option: string) {
    this.moviesView = option
    this.userProperties.setStringParam(SELECTED_MOVIE_VIEW_REGULAR, option)
  }

  onMovieLikedOrDislike(id: number) {
    const userId = this.authService.currentUser.id
    this.likeService.likeOrDislike({userId, movieId: id})
    this.onSearch(this.search)
  }

  onUpdateMovie(id: number) {
    const dialogRef = this.dialog.open(CreateMovieDialogComponent, {
      panelClass: 'dialog-responsive',
      data: {movieId: id, type: MovieDialogType.UPDATE}
    });

    dialogRef.afterClosed().subscribe(_ => {
      console.log("Create Movie Dialog closed")
    });
  }

  onDeleteMovie(id: number) {
    this.movieService.removeMovie(id)
    // this.onSearch(this.search)
  }

  onSearch(query: string) {
    this.search = query
    this.movies = this.movieService.searchForMovie(this.movieRetrievalFunction, query, this.sorting)
  }

  defineButtonsPermission() {
    this.showEdit = this.authService.getEditMoviePermissionFor(this.currentUser)
    this.showMark = this.authService.getMarkMoviePermissionFor(this.currentUser)
  }




  onSortingChanged(sorting: SortMovieOption) {
    this.sorting = sorting
    this.onSearch(this.search)
    this.userProperties.setSortingParam(SELECTED_SORTING_REGULAR, sorting)
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

}

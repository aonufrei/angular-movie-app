import { Component } from '@angular/core';
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
export class FavMoviesPageComponent {

  gridViewValue = 'grid'
  listViewValue = 'list'

  moviesView = this.userProperties.getSelectedMovieViewOption()

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
              private breakpointObserver: BreakpointObserver,
              public movieService: MovieService,
              private likeService: LikeService) {
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

  getUserId() {
    return -1
  }

  getMoviesToShow(userId: number) {
    const likes = this.likeService.getLikes(userId)
    const movies = this.movieService.getMovies()
    const requiredMovieIds = likes.map(l => l.movieId)
    return movies.filter(m => requiredMovieIds.includes(m.id))
  }

  ngOnInit(): void {
    this.userProperties.getSelectedMovieViewOption()
  }

  onViewOptionChanged(option: string) {
    this.moviesView = option
    this.userProperties.setSelectedMovieViewOption(option)
  }

  isGridView = () => this.moviesView === this.gridViewValue

  isListView = () => this.moviesView === this.listViewValue

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

}

import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {UserPropertiesService} from "../services/user-properties.service";
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Movie} from "../common/Movies";
import {MovieService} from "../services/movie.service";

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss']
})
export class MoviesPageComponent implements OnInit, OnDestroy {

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
              public movieService: MovieService,
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

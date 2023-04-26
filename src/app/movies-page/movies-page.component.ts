import {Component, OnInit} from '@angular/core';
import {MovieService} from "../services/movie.service";
import {UserPropertiesService} from "../services/user-properties.service";
import {CdkTableDataSourceInput} from "@angular/cdk/table";

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss']
})
export class MoviesPageComponent implements OnInit {

  gridViewValue = 'grid'
  listViewValue = 'list'

  moviesView = this.userProperties.getSelectedMovieViewOption()

  constructor(public movieService: MovieService, public userProperties: UserPropertiesService) {
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

}

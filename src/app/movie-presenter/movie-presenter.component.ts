import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserPropertiesService} from "../services/user-properties.service";
import {MovieService} from "../services/movie.service";
import {GRID_VIEW, LIST_VIEW, Movie} from "../common/Movies";

@Component({
  selector: 'app-movie-presenter',
  templateUrl: './movie-presenter.component.html',
  styleUrls: ['./movie-presenter.component.scss']
})
export class MoviePresenterComponent {

  @Input() movies: Movie[] = []
  @Input() moviesView: string = GRID_VIEW
  @Input() columnAmount: number = 1;
  @Output() viewChangedEvent = new EventEmitter<string>();
  @Output() movieLikedEvent = new EventEmitter<number>();

  constructor() {
  }

  onViewOptionChanged(option: string) {
    this.viewChangedEvent.emit(option);
  }

  onMovieMadeFavorite(id: number) {
    this.movieLikedEvent.emit(id)
  }

  isGridView = () => this.moviesView === GRID_VIEW

  isListView = () => this.moviesView === LIST_VIEW

  protected readonly GRID_VIEW = GRID_VIEW;
  protected readonly LIST_VIEW = LIST_VIEW;
}

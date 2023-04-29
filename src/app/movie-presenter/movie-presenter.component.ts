import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {compareMovies, GRID_VIEW, LIST_VIEW, Movie} from "../common/Movies";
import {SortOrder, SortMovieField, SortMovieOption} from "../common/ListOptions";

@Component({
  selector: 'app-movie-presenter',
  templateUrl: './movie-presenter.component.html',
  styleUrls: ['./movie-presenter.component.scss']
})
export class MoviePresenterComponent {

  @Input() movies: Movie[] = []
  @Input() moviesView: string = GRID_VIEW
  @Input() columnAmount: number = 1
  @Input() showDelete: boolean = false
  @Input() sortOpt: SortMovieOption = {field: SortMovieField.NAME, order: SortOrder.ASC}

  @Output() viewChangedEvent = new EventEmitter<string>()
  @Output() movieLikedEvent = new EventEmitter<number>()
  @Output() movieDeleteEvent = new EventEmitter<number>()
  @Output() searchEvent = new EventEmitter<string>()
  @Output() sortEvent = new EventEmitter<SortMovieOption>()

  constructor() {
  }

  onViewOptionChanged(option: string) {
    this.viewChangedEvent.emit(option);
  }

  onMovieMadeFavorite(id: number) {
    this.movieLikedEvent.emit(id)
  }

  onMovieDelete(id: number) {
    this.movieDeleteEvent.emit(id)
  }

  onSearchEvent(query: string) {
    this.searchEvent.emit(query)
  }

  onSortFieldChanged(field: SortMovieField) {
    if (this.sortOpt.field === field) return
    this.sortEvent.emit({
      ...this.sortOpt,
      field
    })
  }

  onSortOrderChanged(order: SortOrder) {
    if (this.sortOpt.order === order) return
    this.sortEvent.emit({
      ...this.sortOpt,
      order
    })
  }

  get sortedMovies() {
    return this.movies.sort((m1, m2) => compareMovies(m1, m2, this.sortOpt))
  }

  isGridView = () => this.moviesView === GRID_VIEW

  isListView = () => this.moviesView === LIST_VIEW

  protected readonly GRID_VIEW = GRID_VIEW;
  protected readonly LIST_VIEW = LIST_VIEW;
  protected readonly SortMovieField = SortMovieField;
  protected readonly SortOrder = SortOrder;
  protected readonly compareMovies = compareMovies;
}

import {Injectable} from '@angular/core';
import {
  SELECTED_MOVIE_VIEW,
  SELECTED_MOVIE_VIEW_FAVORITE,
  SELECTED_MOVIE_VIEW_REGULAR,
  SELECTED_NAVIGATION_OPTION,
} from "../common/UserPropertiesConstants";
import {GUEST_USER, User} from "../common/User";

@Injectable({
  providedIn: 'root'
})
export class UserPropertiesService {

  private defaultSelectedNavOpt = 1
  private defaultSelectedMovieView = "grid"

  constructor() {
  }

  getSelectedNavigationOption(): number {
    const activeOption = localStorage.getItem(SELECTED_NAVIGATION_OPTION)
    if (activeOption) {
      try {
        return parseInt(activeOption)
      } catch (e) {
        console.log("Invalid value is provided to local storage. Cannot parse active nav option");
        localStorage.removeItem(SELECTED_NAVIGATION_OPTION)
      }
    }
    return this.defaultSelectedNavOpt
  }

  setSelectedNavigationOption(id: number) {
    localStorage.setItem(SELECTED_NAVIGATION_OPTION, id.toString())
  }

  getSelectedMovieViewOptionOnRegular(): string {
    return this.fetchMovieViewOption(SELECTED_MOVIE_VIEW_REGULAR)
  }

  getSelectedMovieViewOptionOnFavorites(): string {
    return this.fetchMovieViewOption(SELECTED_MOVIE_VIEW_FAVORITE)
  }

  fetchMovieViewOption(optName: string) {
    const activeOption = localStorage.getItem(optName)
    if (activeOption) {
      return activeOption
    }
    return this.defaultSelectedMovieView;
  }

  setSelectedMovieViewOption(option: string) {
    localStorage.setItem(SELECTED_MOVIE_VIEW, option)
  }

  setSelectedMovieViewRegular(option: string) {
    localStorage.setItem(SELECTED_MOVIE_VIEW_REGULAR, option)
  }

  setSelectedMovieViewFavorite(option: string) {
    localStorage.setItem(SELECTED_MOVIE_VIEW_FAVORITE, option)
  }

}

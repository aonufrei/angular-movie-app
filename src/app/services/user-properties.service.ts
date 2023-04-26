import {Injectable} from '@angular/core';
import {SELECTED_MOVIE_VIEW, SELECTED_NAVIGATION_OPTION} from "../common/UserPropertiesConstants";

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

  getSelectedMovieViewOption(): string {
    const activeOption = localStorage.getItem(SELECTED_MOVIE_VIEW)
    if (activeOption) {
      return activeOption
    }
    return this.defaultSelectedMovieView;
  }

  setSelectedMovieViewOption(option: string) {
    localStorage.setItem(SELECTED_MOVIE_VIEW, option)
  }

}

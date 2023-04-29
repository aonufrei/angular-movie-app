import {Injectable} from '@angular/core';
import {SortMovieField, SortMovieOption, SortOrder} from "../common/ListOptions";

@Injectable({
  providedIn: 'root'
})
export class UserPropertiesService {

  private defaultSelectedNavOpt = 1
  private defaultSelectedMovieView = "grid"

  private defaultSorting: SortMovieOption = {
    field: SortMovieField.YEAR,
    order: SortOrder.ASC
  }

  constructor() {
  }

  getNumberFromParam(paramName: string): number {
    const activeOption = localStorage.getItem(paramName)
    if (activeOption) {
      try {
        return parseInt(activeOption)
      } catch (e) {
        console.log(`Invalid value is provided to local storage. Cannot parse param named ${paramName}`);
        localStorage.removeItem(paramName)
      }
    }
    return this.defaultSelectedNavOpt
  }

  getMovieViewOption(paramName: string) {
    const activeOption = localStorage.getItem(paramName)
    if (activeOption) {
      return activeOption
    }
    return this.defaultSelectedMovieView;
  }

  setNumberParam(optionName: string, value: number) {
    localStorage.setItem(optionName, value.toString())
  }

  setStringParam(optionName: string, value: string) {
    localStorage.setItem(optionName, value)
  }

  setSortingParam(optionName: string, value: SortMovieOption) {
    localStorage.setItem(optionName, JSON.stringify(value))
  }

  getSortingFromParam(optionName: string): SortMovieOption {
    const value = localStorage.getItem(optionName)
    if (value) {
      try {
        return JSON.parse(value) || this.defaultSorting
      } catch (e) {
        console.log(`Invalid value is provided to local storage. Cannot parse param named ${optionName}`);
        localStorage.removeItem(optionName)
      }
    }

    return this.defaultSorting
  }

}

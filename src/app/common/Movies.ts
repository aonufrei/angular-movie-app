import {SortMovieField, SortMovieOption, SortOrder} from "./ListOptions";

interface Movie {
  id: number,
  name: string,
  picture: string,
  year: number,
  income: number,
  favorite: boolean,
  createdAt: Date
}

interface MovieForm {
  name: string,
  picture: string,
  year: number,
  income: number,
}

const GRID_VIEW: string = 'grid'
const LIST_VIEW: string = 'list'


function compareByNames(m1: Movie, m2: Movie) {
  const a = m1.name
  const b = m2.name
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

function compareByYears(m1: Movie, m2: Movie) {
  const y1 = m1.year
  const y2 = m2.year
  if (y1 < y2) return -1
  if (y1 > y2) return 1
  return 0
}

function compareByCreatedDates (m1: Movie, m2: Movie) {
  const d1 = m1.createdAt.getTime()
  const d2 = m2.createdAt.getTime()
  if (d1 < d2) return -1
  if (d1 > d2) return 1
  return 0
}

const compareMap = new Map<SortMovieField, (m1: Movie, m2: Movie) => number>([
  [SortMovieField.NAME, compareByNames],
  [SortMovieField.YEAR, compareByYears],
  [SortMovieField.CREATED_DATE, compareByCreatedDates]
])

function compareMovies(m1: Movie, m2: Movie, sortOpt: SortMovieOption) {
  const comparator = compareMap.get(sortOpt.field)
  let result = 0
  if (comparator) {
    result = comparator(m1, m2)
  }
  return sortOpt.order === SortOrder.DESC ? result * -1 : result
}

export {Movie, MovieForm, GRID_VIEW, LIST_VIEW, compareMovies}

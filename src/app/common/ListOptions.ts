import {Movie} from "./Movies";

interface SortMovieOption {
  field: SortMovieField,
  order: SortOrder
}

enum SortMovieField {
  NAME,
  YEAR,
  CREATED_DATE
}

enum SortOrder {
  ASC = "ASC",
  DESC = "DESC"
}

export {SortMovieOption, SortMovieField, SortOrder}

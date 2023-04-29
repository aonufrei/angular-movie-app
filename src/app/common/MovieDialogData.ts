interface MovieDialogData {
  movieId: number,
  type: MovieDialogType
}

enum MovieDialogType {
  CREATE,
  UPDATE
}

export {MovieDialogData, MovieDialogType}

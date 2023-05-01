import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MovieService} from "../services/movie.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MovieDialogData, MovieDialogType} from "../common/MovieDialogData";
import {MovieForm} from "../common/Movies";
import {UserRole} from "../common/User";

@Component({
  selector: 'app-create-movie-dialog',
  templateUrl: './create-movie-dialog.component.html',
  styleUrls: ['./create-movie-dialog.component.scss']
})
export class CreateMovieDialogComponent implements OnInit {

  dialogType = MovieDialogType.CREATE

  form: FormGroup = this.fb.group(
    {
      title: ['', Validators.required],
      picture: ['', Validators.required],
      year: ['', [Validators.required, Validators.max(3000), Validators.min(1800)]],
      income: ['', [Validators.required, Validators.min(0)]]
    },
    null
  );

  constructor(
    private movieService: MovieService, private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateMovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: MovieDialogData
  ) {
  }

  ngOnInit() {
    this.dialogType = this.dialogData.type
    if (this.dialogType === MovieDialogType.UPDATE) {
      this.initUpdateMovie()
    }
  }

  initUpdateMovie() {
    const movie = this.movieService.getMovieById(this.dialogData.movieId)
    if (!movie) {
      return
    }
    this.form.patchValue({...movie, title: movie.name})
  }

  movieFromForm(): MovieForm {
    return {
      name: this.title?.value || "",
      picture: this.picture?.value || "",
      year: this.year?.value || 1800,
      income: this.income?.value || 0,
    }
  }

  onSubmit() {
    if (this.dialogType === MovieDialogType.CREATE) {
      this.createMovie()
    } else if (this.dialogType === MovieDialogType.UPDATE) {
      this.updateMovie()
    }
  }

  onFileLoaded(fileUrl: string) {
    this.form.patchValue({ picture: fileUrl })
  }

  createMovie() {
    const movie = this.movieService.buildMovie(this.movieFromForm())
    this.movieService.addMovie(movie)
  }

  updateMovie() {
    const movie = this.movieService.buildMovie(this.movieFromForm())
    this.movieService.updateMovie(this.dialogData.movieId, movie)
  }

  onCloseClicked(): void {
    this.dialogRef.close();
  }

  getSubmitBtnText(type: MovieDialogType) {
    if (type === MovieDialogType.CREATE) {
      return "Create"
    }
    return "Update"
  }

  get title() {
    return this.form.get('title');
  }

  get pictureHasErrors() {
    console.log(this.picture?.errors)
    return !!this.picture?.errors
  }

  get picture() {
    return this.form.get('picture');
  }

  get year() {
    return this.form.get('year');
  }

  get income() {
    return this.form.get('income');
  }


  protected readonly UserRole = UserRole;
}

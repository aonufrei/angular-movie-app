import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MovieService} from "../services/movie.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-movie-dialog',
  templateUrl: './create-movie-dialog.component.html',
  styleUrls: ['./create-movie-dialog.component.scss']
})
export class CreateMovieDialogComponent implements OnInit {

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
    public dialogRef: MatDialogRef<CreateMovieDialogComponent>
  ) {
  }

  ngOnInit() {

  }

  createMovie() {
    const movie = this.movieService.buildMovie({
      name: this.title?.value || "",
      picture: this.picture?.value || "",
      year: this.year?.value || 1800,
      income: this.income?.value || 0,
    })
    this.movieService.addMovie(movie)
  }

  onCloseClicked(): void {
    this.dialogRef.close();
  }

  get title() {
    return this.form.get('title');
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


}

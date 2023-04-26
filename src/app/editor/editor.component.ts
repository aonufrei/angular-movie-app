import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MovieService} from "../services/movie.service";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {


  constructor(private movieService: MovieService, private fb: FormBuilder) {
  }

  form = this.fb.group(
    {
      title: [Validators.required],
      picture: [Validators.required],
      year: [Validators.required, Validators.max(3000), Validators.min(1800)],
      income: [Validators.required, Validators.min(0)]
    },
  );

  createMovie() {
    const movie = this.movieService.buildMovie({
      name: this.title?.value || "",
      picture: this.picture?.value || "",
      year: this.year?.value || 1800,
      income: this.income?.value || 0,
    })
    this.movieService.addMovie(movie)
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

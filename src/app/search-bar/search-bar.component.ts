import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  @Output() searchEvent =  new EventEmitter<string>();

  form: FormGroup = this.fb.group(
    {
      searchQuery: ['']
    },
    null
  );

  constructor(private fb: FormBuilder) {
  }

  onTextChanged(query: Event) {
    this.searchEvent.emit((query.target as HTMLInputElement).value)
  }

}

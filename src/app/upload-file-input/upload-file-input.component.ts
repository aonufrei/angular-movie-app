import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-upload-file-input',
  templateUrl: './upload-file-input.component.html',
  styleUrls: ['./upload-file-input.component.scss']
})
export class UploadFileInputComponent {

  uploadedFilename: string | undefined = undefined

  @Input() isValid = true
  @Output() loadFileEvent = new EventEmitter<string>();

  loadFile(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.uploadedFilename = file.name
      const url = reader.result as string
      this.loadFileEvent.emit(url)
    };
    reader.readAsDataURL(file);
  }

}

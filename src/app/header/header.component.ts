import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NavbarOption} from "../common/NavbarOption";
import {MatDialog} from "@angular/material/dialog";
import {CreateMovieDialogComponent} from "../create-movie-dialog/create-movie-dialog.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() set setNavOptions(options: NavbarOption[]) {
    this.navOptions = options;
  }

  @Output() navOptionChangedEvent = new EventEmitter<number>();

  navOptions: NavbarOption[] = []

  constructor(public dialog: MatDialog) {
  }

  onOptionChanged(id: number) {
    const ignoreChanging = this.navOptions.find(it => it.id === id && it.selected)
    if (!ignoreChanging) {
      this.navOptionChangedEvent.emit(id);
    }
  }

  openAddMovieDialog() {
    const dialogRef = this.dialog.open(CreateMovieDialogComponent, {
      panelClass: 'dialog-responsive'
    });

    dialogRef.afterClosed().subscribe(_ => {
      console.log("Create Movie Dialog closed")
    });
  }

}

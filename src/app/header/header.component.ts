import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NavbarOption} from "../common/NavbarOption";

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

  navOptions: NavbarOption[] = [];

  onOptionChanged(id: number) {
    const ignoreChanging = this.navOptions.find(it => it.id === id && it.selected)
    if (!ignoreChanging) {
      this.navOptionChangedEvent.emit(id);
    }
  }

}

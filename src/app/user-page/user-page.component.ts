import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {User, UserRole} from "../common/User";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {

  users: User[] = this.authService.users

  constructor(public authService: AuthService) {
  }

  onChangedRole(userId: number, change: MatSelectChange) {
    this.authService.changeUserRole(userId, change.value)
  }

  protected readonly UserRole = UserRole;
}

import {Component} from '@angular/core';
import {GUEST_USER, User, UserRole} from "../common/User";
import {AuthService} from "../services/auth.service";
import { MatDialogRef} from "@angular/material/dialog";
import {SortMovieField} from "../common/ListOptions";

@Component({
  selector: 'app-user-manager-dialog',
  templateUrl: './user-management-dialog.component.html',
  styleUrls: ['./user-management-dialog.component.scss']
})
export class UserManagementDialogComponent {
  currentUser = GUEST_USER
  users: User[] = this.authService.users

  displayedColumns: string[] = ["username", "role"];

  constructor(
    public authService: AuthService,
    public dialogRef: MatDialogRef<UserManagementDialogComponent>,
  ) {
    authService.getUserObserver().subscribe(u => this.currentUser = u)
  }

  onChangedRole(userId: number, role: UserRole) {
    this.authService.changeUserRole(userId, role)
  }

  onCloseClicked() {
    this.dialogRef.close()
  }

  protected readonly UserRole = UserRole;

  protected readonly SortMovieField = SortMovieField;
}

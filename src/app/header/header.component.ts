import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NavbarOption} from "../common/NavbarOption";
import {MatDialog} from "@angular/material/dialog";
import {CreateMovieDialogComponent} from "../create-movie-dialog/create-movie-dialog.component";
import {AuthService} from "../services/auth.service";
import {GUEST_USER, User} from "../common/User";
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";
import {RegisterDialogComponent} from "../register-dialog/register-dialog.component";
import {MovieDialogType} from "../common/MovieDialogData";
import {UserManagementDialogComponent} from "../user-manager-dialog/user-management-dialog.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user = this.authService.currentUser
  authenticated = false

  @Input() set setNavOptions(options: NavbarOption[]) {
    this.navOptions = options;
  }

  @Input() showAddMovieBtn: boolean = false

  @Output() navOptionChangedEvent = new EventEmitter<number>();

  currentUserObserver = this.authService.getUserObserver()

  navOptions: NavbarOption[] = []

  constructor(public dialog: MatDialog, public authService: AuthService) {
  }

  ngOnInit() {
    this.currentUserObserver.subscribe(user => {
      this.user = user
      this.authenticated = user.role !== GUEST_USER.role
    })
  }

  onOptionChanged(id: number) {
    const ignoreChanging = this.navOptions.find(it => it.id === id && it.selected)
    if (!ignoreChanging) {
      this.navOptionChangedEvent.emit(id);
    }
  }

  openAddMovieDialog() {
    const dialogRef = this.dialog.open(CreateMovieDialogComponent, {
      panelClass: 'dialog-responsive',
      data: {movieId: -1, type: MovieDialogType.CREATE}
    });

    dialogRef.afterClosed().subscribe(_ => {
      console.log("Create Movie Dialog closed")
    });
  }

  openManageUsersDialog() {
    const dialogRef = this.dialog.open(UserManagementDialogComponent, {
      panelClass: 'dialog-responsive'
    });

    dialogRef.afterClosed().subscribe(_ => {
      console.log("User Management dialog was closed")
    });
  }

  showLogin() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {});

    dialogRef.afterClosed().subscribe(data => {
      if (data?.action === 'register') {
        this.showRegister()
      }
    });
  }

  showRegister() {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {});

    dialogRef.afterClosed().subscribe(data => {
      if (data?.action === 'login') {
        this.showLogin()
      }
    });
  }

  logout() {
    this.authService.logout()
  }

}

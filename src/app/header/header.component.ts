import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NavbarOption} from "../common/NavbarOption";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../services/auth.service";
import {GUEST_USER} from "../common/User";
import {LoginDialogComponent} from "../login-dialog/login-dialog.component";
import {RegisterDialogComponent} from "../register-dialog/register-dialog.component";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  user = this.authService.currentUser
  authenticated = false

  @Input() set setNavOptions(options: NavbarOption[]) {
    this.navOptions = options;
  }

  @Input() isLightTheme = false

  @Input() isMobile = false

  showAddMovieBtn: boolean = this.authService.getAddMoviePermissionFor(this.user)
  showManageUsersBtn: boolean = this.authService.getManageUsersPermissionFor(this.user)

  @Output() navOptionChangedEvent = new EventEmitter<number>();
  @Output() switchThemeEvent = new EventEmitter<boolean>();
  @Output() onAddMovieEvent = new EventEmitter<boolean>();
  @Output() onManageUsersEvent = new EventEmitter<boolean>();

  currentUserObserver = this.authService.getUserObserver()

  navOptions: NavbarOption[] = []

  destroyed = new Subject<void>();

  screenSizeMap = new Map([
    [Breakpoints.XSmall, 'mobile'],
    [Breakpoints.Small, 'desktop'],
    [Breakpoints.Medium, 'desktop'],
    [Breakpoints.Large, 'desktop'],
    [Breakpoints.XLarge, 'desktop'],
  ]);

  screenSize = 'desktop'

  constructor(public dialog: MatDialog, public authService: AuthService, private breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.screenSize = this.screenSizeMap.get(query) || 'desktop'
          }
        }
      });
  }

  ngOnInit() {
    this.currentUserObserver.subscribe(user => {
      this.user = user
      this.authenticated = user.role !== GUEST_USER.role
      this.redefineButtonsPermissions()
    })
  }

  switchTheme() {
    this.isLightTheme = !this.isLightTheme
    this.switchThemeEvent.emit(this.isLightTheme)
  }

  onOptionChanged(id: number) {
    const ignoreChanging = this.navOptions.find(it => it.id === id && it.selected)
    if (!ignoreChanging) {
      this.navOptionChangedEvent.emit(id);
    }
  }

  openAddMovieDialog() {
    this.onAddMovieEvent.emit(true)
  }

  openManageUsersDialog() {
    this.onManageUsersEvent.emit(true)
  }

  showLogin() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {});

    dialogRef.afterClosed().subscribe(data => {
      if (data?.action === 'register') {
        this.showRegister()
      }
    });
  }

  redefineButtonsPermissions() {
    this.showAddMovieBtn = this.authService.getAddMoviePermissionFor(this.user)
    this.showManageUsersBtn = this.authService.getManageUsersPermissionFor(this.user)
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

  get showForDesktop() {
    return this.screenSize === 'desktop'
  }

  get showForMobile() {
    return this.screenSize === 'mobile'
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

}

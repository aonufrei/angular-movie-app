import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {createNavbarOption, NavbarOption} from "./common/NavbarOption";
import {NavigationEnd, Router} from "@angular/router";
import {UserPropertiesService} from "./services/user-properties.service";
import {SELECTED_NAVIGATION_OPTION} from "./common/UserPropertiesConstants";
import {AuthService} from "./services/auth.service";
import {DOCUMENT} from "@angular/common";
import {CreateMovieDialogComponent} from "./create-movie-dialog/create-movie-dialog.component";
import {MovieDialogType} from "./common/MovieDialogData";
import {UserManagementDialogComponent} from "./user-manager-dialog/user-management-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'movie-app'

  is404Page = false
  isLightTheme = false

  showActionBtns = false

  favMoviesOption = createNavbarOption(2, "Favorites", '/favorites')

  navOptions: NavbarOption[]

  user = this.authService.currentUser

  showAddMovieBtn: boolean = false //this.authService.getAddMoviePermissionFor(this.user)
  showManageUsersBtn: boolean = false //this.authService.getManageUsersPermissionFor(this.user)


  constructor(private router: Router, private authService: AuthService, private userProperties: UserPropertiesService,
              @Inject(DOCUMENT) private document: Document, private renderer: Renderer2, public dialog: MatDialog) {
    this.navOptions = [
      createNavbarOption(1, "Movies", '/movies'),
      // createNavbarOption(2, "Favorites", '/favorites'),
      // createNavbarOption( 3, "User Management", '/user-page')
    ]
    authService.getUserObserver().subscribe(u => {
      if (authService.getFavoriteMoviesPagePermissionFor(u)) {
        if (!this.navOptions.find(o => o.id === this.favMoviesOption.id)) {
          this.navOptions = [...this.navOptions, this.favMoviesOption]
        }
      } else {
        this.navOptions = this.navOptions.filter(o => o.id !== this.favMoviesOption.id)
      }

      this.showAddMovieBtn = this.authService.getAddMoviePermissionFor(u)
      this.showManageUsersBtn = this.authService.getManageUsersPermissionFor(u)
    })
  }

  onNavOptionClicked(id: number) {
    localStorage.setItem(SELECTED_NAVIGATION_OPTION, id.toString())
  }

  selectNavOption(id: number) {
    this.showAddMovieBtn = id === this.navOptions[0].id
    this.navOptions.forEach(opt => opt.selected = opt.id === id)
    this.userProperties.setNumberParam(SELECTED_NAVIGATION_OPTION, id)
  }

  onThemeChanged(isLightTheme: boolean) {
    this.isLightTheme = isLightTheme
    this.userProperties.setThemeMode(this.isLightTheme)
    this.renderer.setAttribute(this.document.body, 'class', this.isLightTheme ? 'lightMode' : 'darkMode')
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

  ngOnInit(): void {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects
        const navOpt = this.navOptions.filter(opt => currentUrl.startsWith(opt.routingUrl))
        if (navOpt.length > 0) {
          this.selectNavOption(navOpt[0].id)
        }
        this.is404Page = currentUrl.startsWith('/404')
        this.showActionBtns = !(['/404', '/no-access'].map(link => currentUrl.startsWith(link)).includes(true))
      }
    })

    this.isLightTheme = this.userProperties.getThemeMode()
    this.renderer.setAttribute(this.document.body, 'class', this.isLightTheme ? 'lightMode' : 'darkMode')

    this.selectNavOption(this.userProperties.getNumberFromParam(SELECTED_NAVIGATION_OPTION))
  }
}

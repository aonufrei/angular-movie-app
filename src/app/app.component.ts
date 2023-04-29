import {Component, OnInit} from '@angular/core';
import {createNavbarOption, NavbarOption} from "./common/NavbarOption";
import {NavigationEnd, Router} from "@angular/router";
import {UserPropertiesService} from "./services/user-properties.service";
import {SELECTED_NAVIGATION_OPTION} from "./common/UserPropertiesConstants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'movie-app'

  is404Page = false

  navOptions: NavbarOption[] = [
    createNavbarOption(1, "Movies", '/movies'),
    createNavbarOption(2, "Favorites", '/favorites'),
    // createNavbarOption( 3, "User Management", '/user-page')
  ]

  showAddMovieBtn: boolean = false

  constructor(private router: Router, private userProperties: UserPropertiesService) {
  }

  onNavOptionClicked(id: number) {
    localStorage.setItem(SELECTED_NAVIGATION_OPTION, id.toString())
  }

  selectNavOption(id: number) {
    this.showAddMovieBtn = id === this.navOptions[0].id
    this.navOptions.forEach(opt => opt.selected = opt.id === id)
    this.userProperties.setNumberParam(SELECTED_NAVIGATION_OPTION, id)
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
      }
    })

    this.selectNavOption(this.userProperties.getNumberFromParam(SELECTED_NAVIGATION_OPTION))
  }
}

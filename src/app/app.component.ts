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
  title = 'movie-app';
  navOptions: NavbarOption[] = [
    createNavbarOption(1, "Movies", '/movies'),
    createNavbarOption(2, "Favorites", '/favorites'),
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
    this.userProperties.setSelectedNavigationOption(id)
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const navOpt = this.navOptions.filter(opt => event.url.startsWith(opt.routingUrl))
        console.log(navOpt)
        if (navOpt.length > 0) {
          console.log(navOpt[0])
          this.selectNavOption(navOpt[0].id)
        }
      }
    })

    this.selectNavOption(this.userProperties.getSelectedNavigationOption())
  }
}

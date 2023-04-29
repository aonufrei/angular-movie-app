import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MoviesPageComponent} from "./movies-page/movies-page.component";
import {FavMoviesPageComponent} from "./fav-movies-page/fav-movies-page.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

import {guestGuard} from './services/user-role.guard'
import {NoAccessPageComponent} from "./no-access-page/no-access-page.component";

const routes: Routes = [
  {path: 'movies', component: MoviesPageComponent},
  {path: 'favorites', component: FavMoviesPageComponent, canActivate: [guestGuard]},
  {path: '404', component: PageNotFoundComponent},
  {path: 'no-access', component: NoAccessPageComponent},
  {path: '', redirectTo: '/movies', pathMatch: 'full'},
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

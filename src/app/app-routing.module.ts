import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MoviesPageComponent} from "./movies-page/movies-page.component";
import {FavMoviesPageComponent} from "./fav-movies-page/fav-movies-page.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {UserPageComponent} from "./user-page/user-page.component";

const routes: Routes = [
  {path: 'movies', component: MoviesPageComponent},
  {path: 'favorites', component: FavMoviesPageComponent},
  {path: 'user-page', component: UserPageComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '', redirectTo: '/movies', pathMatch: 'full'},
  {path: '**', redirectTo: '/not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

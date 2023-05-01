import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from "@angular/flex-layout";
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {MoviesPageComponent} from './movies-page/movies-page.component';
import {FavMoviesPageComponent} from './fav-movies-page/fav-movies-page.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from "@angular/material/tabs";
import {EditorComponent} from './editor/editor.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {IncomePipe} from "./income.pipe";
import {MatListModule} from "@angular/material/list";
import {MoviePresenterComponent} from './movie-presenter/movie-presenter.component';
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {CreateMovieDialogComponent} from './create-movie-dialog/create-movie-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {RegisterDialogComponent} from './register-dialog/register-dialog.component';
import {LoginDialogComponent} from './login-dialog/login-dialog.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSelectModule} from "@angular/material/select";
import {SearchBarComponent} from './search-bar/search-bar.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {MatMenuModule} from "@angular/material/menu";
import {UserManagementDialogComponent} from './user-manager-dialog/user-management-dialog.component';
import {MatTableModule} from "@angular/material/table";
import { NoAccessPageComponent } from './no-access-page/no-access-page.component';
import { UploadFileInputComponent } from './upload-file-input/upload-file-input.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MoviesPageComponent,
    FavMoviesPageComponent,
    IncomePipe,
    EditorComponent,
    MoviePresenterComponent,
    CreateMovieDialogComponent,
    RegisterDialogComponent,
    LoginDialogComponent,
    SearchBarComponent,
    PageNotFoundComponent,
    UserManagementDialogComponent,
    NoAccessPageComponent,
    UploadFileInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatMenuModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

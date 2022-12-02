import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AuthorsComponent } from './authors/authors.component';
import { BooksComponent } from './books/books.component';
import { AuthorsService } from './services/authors.service';
import { BooksService } from './services/books.service';
import { ScreenCheckerService } from './services/screen-checker.service';
import { AuthorInfoComponent } from './authors/author-info/author-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorFormComponent } from './authors/author-form/author-form.component';
import { FormFieldComponent } from './authors/form-field/form-field.component';
import { BookFieldComponent } from './books/book-field/book-field.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    AuthorsComponent,
    BooksComponent,
    AuthorInfoComponent,
    AuthorFormComponent,
    FormFieldComponent,
    BookFieldComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    AuthorsService,
    BooksService,
    AuthorsComponent,
    BookFieldComponent,
    ScreenCheckerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

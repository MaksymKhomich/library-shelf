import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorInfoComponent } from './authors/author-info/author-info.component';
import { AuthorsComponent } from './authors/authors.component';
import { BooksComponent } from './books/books.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ThankYouPageComponent } from './thank-you-page/thank-you-page.component';

export const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "books", component: BooksComponent },
  { path: "author/:id/:operation", component: AuthorInfoComponent },
  { path: "authors", component: AuthorsComponent },
  { path: "thank-you", component: ThankYouPageComponent},
  { path: "", redirectTo:"home", pathMatch: 'full' },
  { path: "**", component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

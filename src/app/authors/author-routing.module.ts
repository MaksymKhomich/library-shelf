import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthorsComponent } from './authors.component';
import { AuthorInfoComponent } from './author-info/author-info.component';

export const routes: Routes = [
    { path: "authors", component: AuthorsComponent,
        children:[
            { path: 'author/:id/:operation', component: AuthorInfoComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthorRoutingModule { }
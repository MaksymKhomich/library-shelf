import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Author, AuthorsService } from '../services/authors.service';
import { ScreenCheckerService } from '../services/screen-checker.service';
let findList: any;
@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit  {
  
  list!: Array<Author>;
  deleteError!: string;
  deleteId!: number;
  isDeleting = false;

  public listUserSearch: any = JSON.parse(localStorage.getItem('datalist') || '[]');

  searchField = document.querySelector("#search")

  constructor(
    readonly router: Router,
    readonly screen: ScreenCheckerService,
    readonly authors: AuthorsService,
    ) {
    }
    
  ngOnInit(): void {
    this.authors.getAuthors().subscribe(data => {
      this.list = data;
      findList = data;
    });

    if(this.list.some( item => item.id == 0))
    this.deleteAuthor(0);

    if(this.searchField){
      this.authors.getAuthors().subscribe(data => {
        this.list = data;
        findList = data;
      });        
    }
  }
  
  createAuthor() {
    this.router.navigate(['/author', (this.authors.authorsList.length + 1), 'create']);
  }

  showAuthorInfo(id: number) {
    this.router.navigate(['/author', `${id}`, 'info']);
  }

  editAuthor(id: number) {
    this.router.navigate(['/author', `${id}`, 'edit']);
  }

  deleteQuestion(id: number) {
    this.deleteError = null!;
    this.deleteId = id;
  }

  cancelDelete() {
    this.isDeleting = false;
    this.deleteId = null!;
  }

  deleteAuthor(id: number) {
    this.isDeleting = true;
    this.authors.deleteAuthor(id)
      .subscribe(c => this.cancelDelete(),
      error => {
        this.deleteError = error;
        this.isDeleting = false;
        });
  }

  filter(event: any){
    let target = event.target.innerText;
    this.authors.getAuthors().subscribe(data => {
      this.list = data; 
      this.list.sort((a:any, b:any):any => {
        if(target == "#") {
          return a.id - b.id;
        } else if(target == "Author") {
          return a.firstName.localeCompare(b.firstName);
        } else if(target == "Books") {
          return a.booksList.length - b.booksList.length;
        };
      });
    });
  }

  search(text: string) {
    this.list = this.authors.filterAuthorList(text, findList);
    this.saveLocalStorage(text);
  }

  saveLocalStorage(dataText: string) {
    if (dataText) {
      this.listUserSearch.push(dataText);
      localStorage.setItem('datalist', JSON.stringify(this.listUserSearch));
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthorsComponent } from '../authors/authors.component';
import { BooksService } from '../services/books.service';
import { ScreenCheckerService } from '../services/screen-checker.service';
let findList: any;
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  public listUserSearch: any = JSON.parse(localStorage.getItem('datalist') || '[]');
  searchField = document.querySelector<HTMLInputElement>("#searchField");

  list!:any;
  

  constructor(
    private booksService: BooksService,
    readonly screen: ScreenCheckerService,
    private author:AuthorsComponent,
  ) {
  }
  
  ngOnInit(): void {
    this.booksService.getBooks().subscribe(data => {
      this.list = data;
      findList = data;
    })
  }

  showInfo(bookId: number){
    this.author.showAuthorInfo(bookId);
  }

  search(text: string) {
    this.list = this.booksService.filterBooksList(text, findList);
    this.saveLocalStorage(text);
  }

  saveLocalStorage(dataText: string) {
    if (dataText) {
      this.listUserSearch.push(dataText);
      localStorage.setItem('datalist', JSON.stringify(this.listUserSearch));
    }
  }

  filter(event: any){
    let target = event.target.innerText;
    this.booksService.getBooks().subscribe(data => {
      this.list = data; 
      this.list.sort((a:any, b:any) => {
        if(target == "Book's name") {
          return a.name.localeCompare(b.name);
        } else if(target == "Genre") {
          return a.genre.localeCompare(b.genre);
        } else if(target == "Page numbers") {
          return b.pagesNumber - a.pagesNumber;
        };
      });
    });
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthorsService } from './authors.service';

export interface Books{
  name: string;
  genre: string;
  pagesNumber: number;
  id?: number;
}

export interface BookInput{
  key: string;
  type: string;
  isId: boolean;
  label: string;
  required: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class BooksService {


  constructor(
    private authorService:AuthorsService,
  ){}
  
  BookInput: Array<BookInput> = [
    {
      key: "name",
      type: "string",
      isId: false,
      label: "Book's name",
      required: true,
    },
    {
      key: "genre",
      type: "string",
      isId: false,
      label: "Genre",
      required: true,
    },
    {
      key: "pagesNumber",
      type: "number",
      isId: false,
      label: "Number of pages",
      required: true,
    },
  ];

  genreList = [
    'Поема',
    "Вірші",
    "Роман",
    "Розповідь",
    "Міф",
  ]

  getBooks(): Observable<any>{
    let bookList: any[] = [];
    this.authorService.authorsList.forEach((item: any) => {
      item.booksList.forEach((book:any) => {
        bookList.push(book);
        book.id = item.id;
      })
    })
    return of(bookList)
  }

  showAuthor(id: number) :number{
    this.authorService.authorsList.find((item: any) => {
      item.id == id
    })
    return id
  }

  filterBooksList(text: string, findList: any[]) {
    return findList.filter(post => post.name.toLowerCase().includes(text.toLowerCase()) || post.genre.toLowerCase().includes(text))
  }
}

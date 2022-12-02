import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Books } from './books.service';

export interface Author{
  id: number;
  lastName: string;
  firstName: string;
  dateOfBirth: Date | string;
  booksList: Books[];
}

@Injectable({
  providedIn: 'root',
})

export class AuthorsService {
  
  authorsList: Array<Author> = [
    { id: 1, lastName: "Шевченко", firstName: "Тарас", dateOfBirth: "1814-03-09", booksList: [
      { name: "Пророк", genre: "Роман", pagesNumber: 348},
      { name: "Слiпий", genre: "Поема", pagesNumber: 208},
      { name: "Музикант", genre: "Розповідь", pagesNumber: 208},
      { name: "Кобзар", genre: "Вірші", pagesNumber: 114},
    ]},

    { id: 2, lastName: "Франко", firstName: "Іван", dateOfBirth: "1856-08-27", booksList: [
      { name: "Захар Беркут", genre: "Роман", pagesNumber: 240},
      { name: "Каменярі", genre: "Вірші", pagesNumber: 232},
      { name: "Для домашнього огнища", genre: "Роман", pagesNumber: 192},
    ]},

    { id: 3, lastName: "Мирний", firstName: "Панас", dateOfBirth: "1849-05-13", booksList: [
      { name: "Повія", genre: "Поема", pagesNumber: 640},
      { name: "Хіба ревуть воли, як ясла повні?", genre: "Поема", pagesNumber: 416},
    ]},

    { id: 4, lastName: "Українка", firstName: "Леся", dateOfBirth: "1871-02-25", booksList: [
      { name: "Лісова пісня", genre: "Розповідь", pagesNumber: 288},
      { name: "Камінний господар", genre: "Роман", pagesNumber: 224},
      { name: "Маруся Чурай", genre: "Поема", pagesNumber: 174},
    ]},

    { id: 5, lastName: "Костенко", firstName: "Ліна", dateOfBirth: "1930-03-19", booksList: [
      { name: "Маруся Чурай", genre: "Роман", pagesNumber: 224},
      { name: "Річка Геракліта", genre: "Роман", pagesNumber: 288},
      { name: "Скіфська одіссея", genre: "Поема", pagesNumber: 256},
    ]},
  ];

  getAuthors(): Observable<Author[]>{
    return of(this.authorsList)
  }

  getAuthor(id: number): Observable<any>{
    const author = this.authorsList.find(item => item.id === id);
    return of(author)
  }

  deleteAuthor(id: number): Observable<any> {
    return of({}).pipe(map(() => this.authorsList.splice(this.authorsList.findIndex(item => item.id === id), 1)));
  }

  createAuthor(newAuthor: Author): Observable<any>{
    this.authorsList.push(newAuthor);
    let author = this.authorsList.find(item => item.id === newAuthor.id);
    return of(author) && this.deleteAuthor(0);
  }

  updateAuthor(ForUpdating: Author): Observable<any> {
      let author = this.authorsList.findIndex(item => item.id === ForUpdating.id);
      let newAuthor = Object.assign({}, ForUpdating);
      this.authorsList[author] = newAuthor;
      return of(newAuthor);
  }

  filterAuthorList(searchText: string, list: any[]) {
    return list.filter(post => post.firstName.toLowerCase().includes(searchText.toLowerCase()) || post.lastName.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  deleteBook(id: number, book: any): Observable<any> {
    let author = this.authorsList[id-1];
    author.booksList.splice(author.booksList.findIndex(item => item.name == book.name), 1)
  
    return of(author)
  }

  updateBook(id: number, book: any, index: number): Observable<any> {
    let author = this.authorsList.find(author => author.id == id);
    author!.booksList[index] = book;
    

    return of(author)
  }
}

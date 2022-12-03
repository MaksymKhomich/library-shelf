import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BookInput, Books, BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-field',
  templateUrl: './book-field.component.html',
  styleUrls: ['./book-field.component.scss']
})
export class BookFieldComponent implements OnInit {

  @Input() operation!: string;
  @Input() submitted!: boolean;
  @Input() vm!: any;
  @Input() bookField!: BookInput;
  @Input() bookForm!: FormGroup;

  genreList = this.book.genreList;
  isAddGenre = false;

  constructor(
    private readonly book: BooksService,
  ) { }

  get isValid() {
    return this.bookForm.controls[this.bookField.key].valid;
  }

  ngOnInit(): void {
  }

  createBook(): any {
    let newBook = <Books>{};

    let name = document.querySelector<HTMLInputElement>("#name")!.value;
    let genre = document.querySelector<HTMLSelectElement>("#genre")!.value;
    let pagesNumber = document.querySelector<HTMLInputElement>("#pagesNumber")!.value;

    newBook.name = name
    if(this.book.genreList.some(item => item == genre)){
      newBook.genre = genre;
    } else {
      let inputGenre = document.querySelector<HTMLSelectElement>("#inputGenre")!.value;
      newBook.genre = inputGenre;
    }
    // newBook.genre = genre;
    newBook.pagesNumber = +pagesNumber;

    return newBook
  }

  createGenre(target:any){
    if(target.value == '--Додати свій варіант--'){
      this.isAddGenre = true;
      // let select = document.querySelector<HTMLSelectElement>("#inputGenre")!.value;
      // console.log(this.book.genreList);
    }
  }
  
  addGenre(text: string){
    this.book.genreList.push(text);
  }


}

import { Component, Input, OnInit } from '@angular/core';
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

  genreList = this.book.genreList

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
    newBook.genre = genre;
    newBook.pagesNumber = +pagesNumber;

    return newBook
  }
}

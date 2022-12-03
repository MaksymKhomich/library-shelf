import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Books, BooksService } from 'src/app/services/books.service';
import { Author, AuthorsService } from '../../services/authors.service';

export interface AuthorInput{
  key: string;
  type: string;
  isId: boolean;
  label: string;
  required: boolean;
}

@Component({
  selector: 'app-author-info',
  templateUrl: './author-info.component.html',
  styleUrls: ['./author-info.component.scss']
})

export class AuthorInfoComponent implements OnInit{

  author!: Author;
  authorInput: Array<AuthorInput> = [
    {
      key: "id",
      type: "number",
      isId: true,
      label: "ID",
      required: true,
    },
    {
      key: "firstName",
      type: "string",
      isId: false,
      label: "First name",
      required: true,
    },
    {
      key: "lastName",
      type: "string",
      isId: false,
      label: "Last name",
      required: true,
    },
    {
      key: "dateOfBirth",
      type: "Date",
      isId: false,
      label: "Date of Birth",
      required: true,
    },
    {
      key: "booksList",
      type: "any",
      isId: false,
      label: "Books list",
      required: false,
    },
  ];

  bookInput = this.book.BookInput;
  books!: Books;
  operation!: string;
  errorMessage!: string;


  constructor(
    readonly router: Router,
    readonly book: BooksService,
    readonly route: ActivatedRoute,
    readonly authorService: AuthorsService,
  ) { }

  ngOnInit(): void {
    this.operation = this.route.snapshot.params['operation'];
    if (this.operation === "create") {
      this.author = { 
        id: 0,
        firstName: '', 
        lastName: '', 
        dateOfBirth: '', 
        booksList: [] = [],
      };
      this.authorService.authorsList.push(this.author)
    } else {
      this.authorService.getAuthor(+this.route.snapshot.params['id'])
        .subscribe((author: Author) => {
          this.author = author
        });
    }
  }

  createAuthorInfo(author: Author) {
    author.id = +this.route.snapshot.params['id'];
    this.errorMessage = null!;
    this.authorService.createAuthor(author)
    .subscribe(
      s => this.router.navigate(['/thank-you'])
  )}
    
  updateAuthorInfo(author: Author) {
    this.errorMessage = null!; 
    this.authorService.updateAuthor(author).subscribe(
      s => this.router.navigate(['/thank-you']),
  )}
  
}

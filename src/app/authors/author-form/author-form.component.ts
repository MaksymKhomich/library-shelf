import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorInput } from '../author-info/author-info.component';
import { Location } from '@angular/common';
import { BookInput, BooksService } from 'src/app/services/books.service';
import { AuthorsService } from 'src/app/services/authors.service';
import { BookFieldComponent } from 'src/app/books/book-field/book-field.component';


@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss']
})

export class AuthorFormComponent implements OnInit {

  @Input() vm: any;
  @Input() books: any

  @Input() authorDefinition!: Array<AuthorInput>;
  @Input() bookDefinition!: Array<BookInput>
  
  @Input() operation!: string;
  @Input() errorMessage!: string;
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() create: EventEmitter<any> = new EventEmitter();
  
  form!: FormGroup;
  status!: string;
  submitted = false;
  
  isDeleting = false;
  deletingBook!: number;
  
  isEditingBook = false;
  index!: number;

  vmCopy: any;
  bookCopy:any;

  book!: BookInput;
  bookForm!: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly AuthorsService: AuthorsService,
    private readonly bookField: BookFieldComponent,
    
  ){}

  clearForm() {
    const authorObj: any = {};
    const bookObj: any = {};
    
    this.vmCopy = Object.assign({}, this.vm);
    this.bookCopy = Object.assign({}, this.books);

    this.authorDefinition.forEach(field => {
      authorObj[field.key] = field.required 
      ? new FormControl(this.vmCopy[field.key], [Validators.required])
      : new FormControl(this.vmCopy[field.key])
    });

    this.bookDefinition.forEach(field => {
      bookObj[field.key] = field.required 
      ? new FormControl(this.bookCopy[field.key], [Validators.required])
      : new FormControl(this.bookCopy[field.key])
    });

    this.form = new FormGroup(authorObj);
    this.bookForm = new FormGroup(bookObj);
  } 

  ngOnInit(): void {
    this.clearForm();
    this.route.params.subscribe(params => {
      this.operation = params['operation'];
      this.clearForm();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['errorMessage'].currentValue && this.status === "waiting") {
      this.status = "";
    }
  }

  onBack(){
    this.errorMessage = null!;
    this.location.back();
  }

  onEdit(){
    this.router.navigate(['../', 'edit'], { relativeTo: this.route });
  }

  onCancel(){
    this.onBack();
  }

  onSave(){
    this.submitted = true;
    if (this.form.valid) {
      this.status = 'waiting';
      this.update.emit(this.form.value);
    }
  }

  onCreate(){
    this.submitted = true;
    if((this.form.value.booksList.length > 0) && this.form.valid){
      this.status = 'waiting';
      this.create.emit(this.form.value);
    }
  }

  onSubmit() {
  }

  addBook(id: number){
    let newBook = this.bookField.createBook();
    
    let Author = this.AuthorsService.authorsList.find(item => item.id === id);
    Author!.booksList.push(newBook);
  }

  editBook(book: any, index: number) {
    let name = document.querySelector<HTMLInputElement>("#name");
    let genre = document.querySelector<HTMLSelectElement>("#genre");
    let pagesNumber = document.querySelector<HTMLInputElement>("#pagesNumber");
    
    name!.value = book.name;
    genre!.value = book.genre;
    pagesNumber!.value = book.pagesNumber;

    this.index = index;
    this.isEditingBook = true;
  }

  saveBook(id: number, book: any){
    let newBook = this.bookField.createBook();
    this.AuthorsService.updateBook(id, newBook, this.index).subscribe()
    this.isEditingBook = false;
  }

  deleteQuestion(book:any){
    this.deletingBook = book.name;
  }
  
  cancelDelete() {
    this.deletingBook = null!;
  }

  deleteBook(id: number, book: any){
    this.isDeleting = true;
    this.AuthorsService.deleteBook(id, book).subscribe(c => this.cancelDelete(),
    error => {
      this.isDeleting = false;
      });
      
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthorInput } from '../author-info/author-info.component';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit{

  @Input() authorField!: AuthorInput;
  @Input() form!: FormGroup;
  @Input() operation!: string;
  @Input() submitted!: boolean;

  @Input() vm!: any;
  @Input() list!:any;

  get isValid() {
    return this.form.controls[this.authorField.key].valid;
  }

  constructor() { }
  
  ngOnInit(): void {
  }
  
}

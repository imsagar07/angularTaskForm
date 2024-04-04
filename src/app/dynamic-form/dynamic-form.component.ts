import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  form: FormGroup;
  jsonData = [ 
    { ControlName: 'First Name', Position: 1, IsRequired: true },
    { ControlName: 'Last Name', Position: 2, IsRequired: false },
    { ControlName: 'Contact No', Position: 3, IsRequired: true },
    { ControlName: 'Email', Position: 4, IsRequired: false },
    { ControlName: 'Address', Position: 5, IsRequired: false }
  ]; 
  tableData: any[] = []; 
  tableHeaders: string[] = this.jsonData.map(item => item.ControlName);
  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({}); 
    this.jsonData.forEach(field => { 
      this.form.addControl(field.ControlName, 
        new FormControl('', field.IsRequired ? Validators.required : null));
    });
  }

  saveData(): void {
    if (this.form.valid) { 
      this.tableData.push(this.form.value);
      this.form.reset();
    } else {
      alert('Please fill in all required fields.');
    }
  }

  clearForm(): void {
    this.form.reset();
  }
}

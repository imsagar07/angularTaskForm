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
    { ControlName: 'FirstName', Position: 1, IsRequired: true },
    { ControlName: 'LastName', Position: 2, IsRequired: false },
    { ControlName: 'ContactNo', Position: 3, IsRequired: true },
    { ControlName: 'Email', Position: 4, IsRequired: false },
    { ControlName: 'Address', Position: 5, IsRequired: false }
  ]; 
  tableData: any[] = []; 

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({}); 
    this.jsonData.forEach(field => { 
      this.form.addControl(field.ControlName.toLowerCase(), 
        new FormControl('', field.IsRequired ? Validators.required : null));
    });
  }

  saveData(): void {
    if (this.form.valid) {
      const newObj = Object.entries(this.form.value).reduce((acc, [key, value]) => ({ ...acc, [key.replace(/\s+/g, '')]: value }), {});
      this.tableData.push(newObj);
      this.form.reset();
    } else {
      alert('Please fill in all required fields.');
    }
  }

  clearForm(): void {
    this.form.reset();
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  form!: FormGroup;
  data: any = [];
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      note: ['', Validators.required],
      type: ['1', Validators.required],
      date: [''],
      file: [''],
      id: ['']
    });
  }

  onSave() {
    if (this.isEdit) {
      this.data.map((item: any) => {
        if (item.id == this.form.value.id) {
          item.note = this.form.value.note;
          item.type = this.form.value.type;
          item.date = this.form.value.date;
        }
      });
    } else {
      this.form.value.id = Math.floor(Math.random() * 1000000000);
      this.data.push(this.form.value);
    }
    this.isEdit = false;
    this.form.reset();
  }

  editItem(item: any) {
    this.isEdit = true;
    this.form.reset();
    this.form.patchValue({
      note: item.note,
      type: item.type,
      date: item.date,
      id: item.id
    });
  }

  deleteItem(id: any) {
    let output = this.data.filter((obj: any) => obj.id == id);
    let index = this.data.indexOf(output[0]);
    if (index >= 0) this.data.splice(index, 1);
  }

}

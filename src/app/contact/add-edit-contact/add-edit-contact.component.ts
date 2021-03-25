import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-edit-contact',
  templateUrl: './add-edit-contact.component.html',
  styleUrls: ['./add-edit-contact.component.scss']
})
export class AddEditContactComponent implements OnInit {
public breakpoint: number; // Breakpoint observer code
  public isEdit = '';
  public contactForm: FormGroup;
  wasFormChanged = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public contactData:any,
    public dialog: MatDialogRef<AddEditContactComponent>,
    private fb: FormBuilder
  ) { 
    this.isEdit = this.contactData.flag
  }

  public ngOnInit(): void {
    if (this.contactData.flag == "edit") {
     this.buildEditContactForm();
    } else {
      this.buildAddContactForm();
    }
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }
  buildEditContactForm(){
    const contactData = this.contactData.rowValue
    let birthdate = new Date(contactData.dateofbirth);
    this.contactForm = this.fb.group({
    firstName: [contactData.firstName, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
    lastName: [contactData.lastName, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
    email: [contactData.email, [Validators.required, Validators.email]],
    contactNumber: [contactData.contactNumber, [Validators.required, Validators.pattern("^[0-9]*$")]],
    dateofbirth:[birthdate],
    address:[contactData.address],
    gender:[contactData.gender == "Male" ? "1" : "2"],
    status:[contactData.status ? "1" : "2"],
    index:[contactData.index]
  });
  }
  buildAddContactForm(){
    this.contactForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      lastName: [null, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      email: [null, [Validators.required, Validators.email]],
      contactNumber: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      dateofbirth:[],
      address:[],
      gender:[],
      status:['1'],
      index:[],
    });
  }

  public onaddCus(): void {
    if (this.contactData.flag == 'edit') {
      this.dialog.close({event:'edit',data:this.contactForm.value});
    } else {
      this.dialog.close({event:'add',data:this.contactForm.value});
    }
  }

  closeDialog() : void {
    this.dialog.close({event:'close',data:null});
  }
 
  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }

  formChanged() {
    this.wasFormChanged = true;
  }

}

import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import {MatTableDataSource , MatTable} from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddEditContactComponent} from "../contact/add-edit-contact/add-edit-contact.component";
import * as data from './contact-data.json';
import { AlertComponent } from '../common/alert-box/alert.component';
import {DialogMessages} from '../common/constants/messages'
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit,AfterViewInit {
displayedColumns: string[] = ['firstName','lastName', 'email', 'contactNumber','gender', 'status', 'actions'];
  contacts = new MatTableDataSource()
  public currentCell = 0

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.contacts.data = (data as any).default; 
  }

  ngAfterViewInit() {
   this.contacts.paginator = this.paginator;
  }
getOccurrence(dataObj: any, value: any) {
    return dataObj.filter(v => v.gender === value).length;
}
 openContactDialog(flag: any,item:any) {
    const dialogRef = this.dialog.open(AddEditContactComponent,{
      width: '640px',
      disableClose: true,
      data: {
        flag:flag,
      rowValue: item
    } 
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'add'){
        this.addToContact(result.data)
      } 
      if(result.event == 'edit'){
        this.editUser(result.data)
      } 
      
       
    });
 }
 removeContact(index: number) {
   this.confirmationDialog(index)
    
  }

  confirmationDialog(index: number): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data =  {
      title: DialogMessages.confirmation_title,
      subTitle: DialogMessages.confirmation_subtitle_delete_contact,
      buttonCancelName: DialogMessages.confirmation_button_cancel,
      buttonConfirmName: DialogMessages.confirmation_button_delete,
    }
    let dialogRef = this.dialog.open(AlertComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'confirm') {
        const data = this.contacts.data;
    data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);

    this.contacts.data = data;
      }
    })
     
        
  }

  
  /** Whether the number of selected elements matches the total number of rows. */
  addToContact(newData) {
    let realData = [...this.contacts.data , {
      index : this.contacts.data.length + 1,
      firstName: newData.firstName,
      lastName:newData.lastName,
      email: newData.email,
      contactNumber:newData.contactNumber,
      address: newData.address,
      dateofbirth: newData.dateofbirth,
      gender: newData.options == '1' ? 'Male' : 'Female',
      status: newData.status == '1' ? true : false,
    }]
    this.contacts.data  = realData as any
  }

editUser(editedData: any){
    const editedContacts = this.contacts.data
    editedContacts.forEach((value: any,key: any)=>{
      if(value.index == editedData.index){
        editedData.gender = editedData.gender == '1' ? 'Male' : 'Female'
       value.index = editedData.index,
    value.firstName= editedData.firstName,
    value.LastName= editedData.LastName,
    value.email= editedData.email,
    value.contactNumber = editedData.contactNumber,
    value.gender= editedData.gender,
    value.address= editedData.address,
    value.dateofbirth= editedData.dateofbirth,
    value.status=  editedData.status == '1' ? true : false
      }
    });
    this.contacts.data = editedContacts
  }
  
}

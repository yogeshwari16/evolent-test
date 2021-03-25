import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
// alert dialog box component
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  title: null;
  ischecked = false
  subTitle: string = "Confirm";
  buttonCancelName: string = "Cancel";
  buttonConfirmName: string = "Ok";
  endInterview : boolean;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogref: MatDialogRef<AlertComponent> ) {
    if (data) {
      this.title = data.title ? data.title : this.title;
      this.subTitle = data.subTitle ? data.subTitle : '';
      this.buttonCancelName = data.buttonCancelName ? data.buttonCancelName : this.buttonCancelName;
      this.buttonConfirmName = data.buttonConfirmName ? data.buttonConfirmName : this.buttonConfirmName;
      this.endInterview = data.endInterview? data.endInterview : false
    }
  }

  ngOnInit() {
  }
  /**
   * method to close alert dialog
   * @returns void
   */
   
  close(): void {
    this.dialogref.close();
  }
}

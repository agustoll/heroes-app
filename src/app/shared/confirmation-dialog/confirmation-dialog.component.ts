import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit{
  title:string = 'Confirmation';
  content: string = 'Do you confirm the action?';

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  //sets title and content data if it's injected
  ngOnInit(): void {
    if (this.data.title) {
      this.title = this.data.title
    }
    if(this.data.content) {
      this.content = this.data.content;
    }
  }
}

export interface DialogData {
  title: string;
  content: string;
}

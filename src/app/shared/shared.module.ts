import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { UppercaseDirective } from './uppercase.directive';



@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    UppercaseDirective
  ],
  exports: [
    UppercaseDirective
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {HeroComponent} from "./hero.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [HeroComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forChild([
      {path: '', component: HeroComponent}
    ]),
    SharedModule
  ],
  exports: [RouterModule]
})
export class HeroModule { }

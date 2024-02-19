import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: 'hero', loadChildren: () => import('./hero/hero.module').then((m) => m.HeroModule)},
      {path: 'hero/:id', loadChildren: () => import('./hero/hero.module').then((m) => m.HeroModule)},
      {
        path: 'heroes-list',
        loadChildren: () => import('./heroes-list/heroes-list.module').then((m) => m.HeroesListModule)
      },
      {path: '', redirectTo: '/heroes-list', pathMatch: 'full'},
      {path: '**', redirectTo: '/heroes-list'}
    ]),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

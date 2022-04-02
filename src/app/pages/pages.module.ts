//angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
//custom
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';



@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent
  ],
  exports : [
    PagesComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class PagesModule { }

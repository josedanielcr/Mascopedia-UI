//angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
//custom
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { CatsComponent } from './cats/cats.component';



@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    CatsComponent
  ],
  exports : [
    PagesComponent,
    HomeComponent,
    CatsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    ComponentsModule
  ]
})
export class PagesModule { }

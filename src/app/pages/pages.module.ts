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
import { PostsComponent } from './posts/posts.component';
import { AnimalComponent } from './animal/animal.component';



@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    CatsComponent,
    PostsComponent,
    AnimalComponent
  ],
  exports : [
    PagesComponent,
    HomeComponent,
    CatsComponent,
    PostsComponent,
    AnimalComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    ComponentsModule
  ]
})
export class PagesModule { }

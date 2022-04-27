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
import { PostCreationComponent } from './post-creation/post-creation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    CatsComponent,
    PostsComponent,
    AnimalComponent,
    PostCreationComponent
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
    ComponentsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class PagesModule { }

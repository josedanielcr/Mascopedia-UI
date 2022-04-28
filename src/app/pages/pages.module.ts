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
import { MyPostsComponent } from './my-posts/my-posts.component';
import { MatTabsModule } from '@angular/material/tabs';



@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    CatsComponent,
    PostsComponent,
    AnimalComponent,
    PostCreationComponent,
    MyPostsComponent
  ],
  exports : [
    PagesComponent,
    HomeComponent,
    CatsComponent,
    PostsComponent,
    AnimalComponent,
    PostCreationComponent,
    MyPostsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    ComponentsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule
  ]
})
export class PagesModule { }

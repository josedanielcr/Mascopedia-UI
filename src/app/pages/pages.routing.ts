//angular
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
//custom
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../guards/auth/auth.guard';
import { CatsComponent } from './cats/cats.component';
import { PostsComponent } from './posts/posts.component';
import { AnimalComponent } from './animal/animal.component';

const routes: Routes = [
   {
       path      : 'home',
       component : PagesComponent,
       canActivate: [AuthGuard],
       children  : [
        { path: '',                   component: HomeComponent }, 
        { path: 'cat',               component: CatsComponent },
        { path: 'animal/:type/:name', component: AnimalComponent },
        { path: 'posts/:type/:id',    component: PostsComponent }, 
       ]
   }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
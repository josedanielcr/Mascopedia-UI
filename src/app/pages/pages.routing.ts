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
import { PostCreationComponent } from './post-creation/post-creation.component';
import { MyPostsComponent } from './my-posts/my-posts.component';

const routes: Routes = [
   {
       path      : 'home',
       component : PagesComponent,
       canActivate: [AuthGuard],
       children  : [
        { path: '',                      component: HomeComponent }, 
        { path: 'cat',                   component: CatsComponent },
        { path: 'myPosts',               component: MyPostsComponent },
        { path: 'animal/:type/:name',    component: AnimalComponent },
        { path: 'posts/:type/:id',       component: PostsComponent },
        { path: 'create/post/:id/:type', component: PostCreationComponent },
       ]
   }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
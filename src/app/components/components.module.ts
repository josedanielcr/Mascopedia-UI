//angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//custom
import { CardComponent } from './card/card.component';
import { CardGridComponent } from './card-grid/card-grid.component';
import { PipesModule } from '../pipes/pipes.module';
//angular material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PostCardComponent } from './post-card/post-card.component';
import { PostGridComponent } from './post-grid/post-grid.component';


@NgModule({
  declarations: [
    CardComponent,
    CardGridComponent,
    PostCardComponent,
    PostGridComponent
  ],
  exports: [
    CardComponent,
    CardGridComponent,
    PostCardComponent,
    PostGridComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    PipesModule,
    MatButtonModule
  ]
})
export class ComponentsModule { }

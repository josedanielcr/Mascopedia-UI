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
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule  } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    CardComponent,
    CardGridComponent,
    PostCardComponent,
    PostGridComponent,
    TableComponent
  ],
  exports: [
    CardComponent,
    CardGridComponent,
    PostCardComponent,
    PostGridComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    PipesModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule
  ]
})
export class ComponentsModule { }

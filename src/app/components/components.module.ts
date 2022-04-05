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


@NgModule({
  declarations: [
    CardComponent,
    CardGridComponent
  ],
  exports: [
    CardComponent,
    CardGridComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    PipesModule,
    MatButtonModule
  ]
})
export class ComponentsModule { }

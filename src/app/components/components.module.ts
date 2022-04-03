import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { CardGridComponent } from './card-grid/card-grid.component';



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
    CommonModule
  ]
})
export class ComponentsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoDataPipe } from './no-data.pipe';


@NgModule({
    declarations: [
    NoDataPipe
  ],
    exports: [
        NoDataPipe
    ],
    imports: [
        CommonModule
    ]
})
export class PipesModule { }

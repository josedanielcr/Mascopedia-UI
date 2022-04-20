import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoDataPipe } from './no-data.pipe';
import { NoImagePipe } from './no-image.pipe';

@NgModule({
    declarations: [
        NoDataPipe,
        NoImagePipe
    ],
    exports: [
        NoDataPipe,
        NoImagePipe
    ],
    imports: [
        CommonModule
    ]
})
export class PipesModule { }

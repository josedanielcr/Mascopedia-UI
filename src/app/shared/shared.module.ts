//angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//custom
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
//angular material
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule
  ]
})
export class SharedModule { }

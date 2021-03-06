//angular components
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
//custom components
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signUp', component: SignUpComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
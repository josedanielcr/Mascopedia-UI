/**
 * login component
 * @author jcanales.
 * @since  01.4.2022
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    loginForm      : FormGroup;
    errMsg         : string = '';
    executingLogin : boolean = false;

    constructor( private fb  : FormBuilder, 
        private authService : AuthService,
        private router      : Router ) {
        this.createForm();
    }

   /**
    * Create a form group with the form builder
    */
    createForm(){
        this.loginForm = this.fb.group({
            email    : ['',[ Validators.required, Validators.pattern( '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$' ) ]],
            password : ['',[ Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}') ]]
        });
    }

    /**
     * It checks if the form is valid and if it is, it sends the data to the login function.
     * @returns Nothing.
     */
    submitForm(){
        this.errMsg = '';
        this.executingLogin = true;
    
        if( this.loginForm.invalid ){
    
          Object.values( this.loginForm.controls ).forEach( control => {
            if( control instanceof FormGroup ){
              Object.values( control.controls ).forEach( control => control.markAsTouched() );
            } else{
              control.markAsTouched();
            }
          })
          this.executingLogin = false;
          return;
        }

        const data = {
            email    : this.loginForm.controls['email'].value,
            password : this.loginForm.controls['password'].value
        }
        
        this.login( data );
    }

    /**
     * The login function is called when the user clicks the login button. 
     * It sends a request to the authService to login the user. 
     * If the user is successfully logged in, the user is redirected to the home page. 
     * If the user is not logged in, the error message is displayed
     * @param data - The data that will be sent to the server.
     */
    login( data ){
        this.authService.login( data ).subscribe({
            next  : () => {
                this.executingLogin = false;
                Swal.fire({
                    position: 'bottom-left',
                    icon: 'success',
                    title: 'Login succesfull',
                    showConfirmButton: false,
                    width: '250px',
                    timer: 2000
                    }).then( () => {
                        this.router.navigateByUrl('/home');
                })
            },
            error : ( error ) => {
                this.executingLogin = false;
                this.errMsg = error.msg;
            } 
        })
    }


    //getters
    get invalidEmail(){
        return this.loginForm.get('email').invalid && this.loginForm.get('email').touched;
    }

    get invalidPassword(){
        return this.loginForm.get('password').invalid && this.loginForm.get('password').touched;
    }


}

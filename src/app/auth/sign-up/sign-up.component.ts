/**
 * SignUp component
 * @author jcanales.
 * @since  30.3.2022
 */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

    signUpForm      : FormGroup;
    signUpErr       : string = '';
    executingSignUp : boolean = false;

    constructor( private fb          : FormBuilder, 
                 private authService : AuthService,
                 private router      : Router ) {
        this.createForm();
    }

    /**
     * Create a form group with the form builder
     */
    createForm(){
        this.signUpForm = this.fb.group({
            fullName : ['',[ Validators.required ]],
            age      : ['',[ Validators.required, Validators.min(18), Validators.max(100) ]],
            email    : ['',[ Validators.required, Validators.pattern( '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$' ) ]],
            password : ['',[ Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}') ]]
        });
    }


    /**
     * It checks if the form is valid and if it is, it sends the data to the signUp function.
     * @returns Nothing.
     */
    submitForm(){
        this.signUpErr = '';
        this.executingSignUp = true;
    
        if( this.signUpForm.invalid ){
    
          Object.values( this.signUpForm.controls ).forEach( control => {
            if( control instanceof FormGroup ){
              Object.values( control.controls ).forEach( control => control.markAsTouched() );
            } else{
              control.markAsTouched();
            }
          })
          this.executingSignUp = false;
          return;
        }

        const data = {
            fullName : this.signUpForm.controls['fullName'].value, 
            age      : this.signUpForm.controls['age'].value,
            email    : this.signUpForm.controls['email'].value,
            password : this.signUpForm.controls['password'].value
        }

        this.signUp( data );
    }

    /**
     * This function is used to create a new user account
     * @param data - The data that will be sent to the backend.
     */
    signUp( data ){

        this.authService.signUp( data ).subscribe({
            next : () => {
                this.executingSignUp = false;
                Swal.fire({
                    position: 'bottom-left',
                    icon: 'success',
                    title: 'Account created',
                    showConfirmButton: false,
                    width: '250px',
                    timer: 2000
                  }).then( () => {
                    this.router.navigateByUrl('/login');
                  })
            },
            error: ( err ) => {
                this.executingSignUp = false;
                this.signUpErr = err.msg; 
            }
        });

    }

    //getters
    get invalidFullName(){
        return this.signUpForm.get('fullName').invalid && this.signUpForm.get('fullName').touched;
    }

    get invalidAge(){
        return this.signUpForm.get('age').invalid && this.signUpForm.get('age').touched;
    }

    get invalidEmail(){
        return this.signUpForm.get('email').invalid && this.signUpForm.get('email').touched;
    }

    get invalidPassword(){
        return this.signUpForm.get('password').invalid && this.signUpForm.get('password').touched;
    }

    
    

}

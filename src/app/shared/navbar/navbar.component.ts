import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatsService } from 'src/app/services/animals/cats.service';
import { DogsService } from 'src/app/services/animals/dogs.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor( private authService : AuthService,
                 private router : Router,
                 private dogService : DogsService,
                 private catService : CatsService,
                 private activatedRoute : ActivatedRoute) { }

    ngOnInit(): void {
    }


    /**
     * It deletes the token from the local storage and then navigates to the login page.
     */
    signOut(){
        this.authService.deleteToken();
        this.router.navigateByUrl('/login');
    }


    /**
     * If the current URL includes the word 'cats', then the animal variable is set to 'cat', otherwise
     * it's set to 'dog'.
     * @param event - the event that triggered the function
     */
    retrieveBreed( event ){
        
        let animal = '';
        if( this.router.url.includes('cats') ){
            animal = 'cat';
        } else{
            animal = 'dog';
        }
        this.router.navigate(['animal', animal, event.target.value], {relativeTo : this.activatedRoute});   
    }


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor( private authService : AuthService,
                 private router : Router) { }

    ngOnInit(): void {
    }

    signOut(){
        this.authService.deleteToken();
        this.router.navigateByUrl('/login');
    }

}

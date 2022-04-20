import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {


    constructor( private authService : AuthService,
                 private router      : Router ){}

    /**
     * If the user is not logged in, redirect them to the login page
     * @param {ActivatedRouteSnapshot} route - ActivatedRouteSnapshot,
     * @param {RouterStateSnapshot} state - RouterStateSnapshot
     * @returns A boolean value.
     */
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        
        if( !this.authService.isLoggedIn() ){
            this.router.navigateByUrl('/login');
            return false; 
        }
        return true;

    }
  
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor( private http : HttpClient ) { }

    /**
    * It sends a post request to the api to create a new user.
    * @param data - The data that you want to send to the server.
    * @returns A response object.
    */
    signUp( data ){
        return this.http.post( `${ environment.apiBaseUrl }/users/`, data )
            .pipe(
                catchError( err => { throw err.error } )
            );
    }

    /**
     * It sends a post request to the api/auth/login endpoint with the data object as the body.
     * @param data - The data that will be sent to the server.
     * @returns The observable of the response.
     */
    login( data ){
        return this.http.post(`${ environment.apiBaseUrl }/auth/login`, data )
            .pipe(
                map( ( resp ) => {
                    this.saveToken( resp['token'] );
                    return resp;
                } ),
                catchError( err => { throw err.error })
            );
    }

    //misc functions
    /**
    * Save the token to local storage
    * @param {string} token - The token that you want to save.
    */
    saveToken( token : string ) {
        localStorage.setItem('token', token );
    }

   /**
    * Retrieve the token from local storage
    * @returns The token is being returned.
    */
    retrieveToken(){
        return localStorage.getItem('token') || '';
    }
}

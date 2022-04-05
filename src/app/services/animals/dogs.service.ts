import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { GenericAnimal } from 'src/app/interfaces/genericAnimal';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { GenericAnimalService } from './generic-animal.service';

@Injectable({
    providedIn: 'root'
})
export class DogsService {


    constructor( private http                 : HttpClient,
                 private authService          : AuthService,
                 private genericAnimalService : GenericAnimalService ) { }


    /**
    * It returns an array of dogs breeds.
    * @param limit - The number of dogs to return.
    * @returns An array of GenericAnimal objects.
    */
    getDogBreeds( limit ){

        let dogsBreed : GenericAnimal[] = [];

        return this.http.get<GenericAnimal[]>(`${ environment.apiBaseUrl }/dogs?limit=${ limit }`, {
            headers: { 'token' : this.authService.retrieveToken() }
        }).pipe(
            map( (response : any[] ) => {
                response.map( ( dogBreed ) => {  
                    dogsBreed.push(this.genericAnimalService.parseToGenericAnimal( dogBreed ));
                })
                return dogsBreed;
            }),
            catchError( err => { throw new Error( err.error.msg )})
        );

    }

}

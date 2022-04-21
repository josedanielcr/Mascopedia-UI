import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { GenericAnimal } from 'src/app/interfaces/genericAnimal';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { GenericAnimalService } from './generic-animal.service';

@Injectable({
    providedIn: 'root'
})
export class DogsService {


    private dogPage: number = 1;
    public  loading: boolean = false;

    constructor( private http                 : HttpClient,
                 private authService          : AuthService,
                 private genericAnimalService : GenericAnimalService ) { }

    /**
     * It returns an array of GenericAnimal objects, which are created from the response of the API
     * call. 
     * 
     * @param limit - number
     * @returns An array of GenericAnimal objects.
     */
    getDogBreeds( limit ){

        if ( this.loading ){ return of([]); }
        this.loading = true;

        let dogsBreed : GenericAnimal[] = [];

        return this.http.get<GenericAnimal[]>(`${ environment.apiBaseUrl }/dogs?limit=${ limit }&page=${this.dogPage}`, {
            headers: { 'token' : this.authService.retrieveToken() }
        }).pipe(
            map( (response : any[] ) => {
                response.map( ( dogBreed ) => {  
                    dogsBreed.push(this.genericAnimalService.parseToGenericAnimal( dogBreed, 'dog' ));
                })
                return dogsBreed;
            }),
            tap( () => {
                this.dogPage +=1;
                this.loading = false;
            }),
            catchError( err => { throw new Error( err.error.msg )})
        );

    }

    /**
     * It takes a name as a parameter, makes a get request to the server, and returns an array of
     * GenericAnimal objects.
     * @param name - string
     * @returns An array of GenericAnimal objects.
     */
    getDogByName( name ){

        let dogsBreed : GenericAnimal[] = [];

        return this.http.get<GenericAnimal[]>(`${environment.apiBaseUrl}/dogs/${name}`, {
            headers : { 'token' : this.authService.retrieveToken() }
        }).pipe(
            map( ( response : any[] )=> {
                response.map( ( dogBreed ) => {
                    console.log(dogBreed);
                    
                    dogsBreed.push(this.genericAnimalService.parseToGenericAnimal( dogBreed, 'dog' ));
                })
                return dogsBreed;
            }),
            catchError( err => { throw new Error( err )})
        )
    }

    /**
     * This function resets the dogPage variable to 1.
     */
    resetPages(){
        this.dogPage = 1;
    }

}

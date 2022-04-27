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
export class CatsService {


    private catPage: number = 1;
    public  loading: boolean = false;

    constructor( private http                 : HttpClient,
                 private authService          : AuthService,
                 private genericAnimalService : GenericAnimalService ) { }


    /**
     * It returns an observable of an array of generic animals, which is an array of objects that have a
     * name and a picture. 
     * @param limit - number = 10;
     * @returns An Observable of an array of GenericAnimal objects.
     */
    getCats( limit ) {

        if ( this.loading ){ return of([]); }
        this.loading = true;

        let catsBreeds : GenericAnimal[] = [];

        return this.http.get<GenericAnimal[]>(`${environment.apiBaseUrl}/cats?limit=${ limit }&page=${this.catPage}`, {
            headers : { 'token' : this.authService.retrieveToken() }
        }).pipe(
            map( (response : any[] ) => {
                response.map( ( catBreed ) => {
                    catsBreeds.push(this.genericAnimalService.parseToGenericAnimal( catBreed, 'cat' ));
                })
                return catsBreeds;
            }),
            tap( () => {
                this.catPage +=1;
                this.loading = false;
            }),
            catchError( err => { throw new Error( err )})
        );
    }
    
    /**
     * It takes a string as a parameter, makes a GET request to the API, and returns an array of
     * GenericAnimal objects.
     * @param name - string
     * @returns An array of GenericAnimal objects.
     */
    getCatByName( name ){

        let catsBreeds : GenericAnimal[] = [];

        return this.http.get<GenericAnimal[]>(`${environment.apiBaseUrl}/cats/${name}`, {
            headers : { 'token' : this.authService.retrieveToken() }
        }).pipe(
            map( ( response : any[] )=> {
                response.map( ( catBreed ) => {
                    catsBreeds.push(this.genericAnimalService.parseToGenericAnimal( catBreed, 'cat' ));
                })
                return catsBreeds;
            }),
            catchError( err => { throw new Error( err )})
        )
    }

    /**
     * Reset the catPage to 1.
     */
    resetCatPage(){
        this.catPage = 1;
    }

}

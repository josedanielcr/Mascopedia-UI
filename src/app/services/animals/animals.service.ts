import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {

    constructor( private http : HttpClient,
                 private authService : AuthService ) { }


    /**
     * This function will return an array of posts that match the breedId and type passed in as parameters
     * @param {string} breedId - The id of the breed you want to get the animals of.
     * @param {string} type - string - this is the type of animal you want to get.
     * @returns An array of posts
     */
    getAnimalsByType( breedId : string , type : string ){
        
        return this.http.get<Post[]>(`${environment.apiBaseUrl}/posts/${breedId}/${type}`, {
            headers : { 'token' : this.authService.retrieveToken() }
        });

    }

}

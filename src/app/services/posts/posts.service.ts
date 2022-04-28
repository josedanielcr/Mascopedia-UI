import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

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

    /**
    * It takes in a data object, and then it returns an observable of type any
    * @param data - {} is the data that we want to send to the server.
    * @returns The observable of the post request.
    */
    createPost( data : {} ){
        
        return this.http.post(`${environment.apiBaseUrl}/posts`, data, {
            headers : { 'token' : this.authService.retrieveToken() }
        })
    }

    /**
    * We're making a GET request to the `/posts/myPosts` endpoint, and we're sending the token as a header
    * @returns An observable of type any.
    */
    getMyPosts(){

        return this.http.get<any[]>(`${environment.apiBaseUrl}/posts/myPosts`, {
            headers : { 'token' : this.authService.retrieveToken() }
        })

    }

    /**
    * It deletes a post from the database, given the post's id
    * @param id - The id of the post to be deleted.
    * @returns A string
    */
    deletePost( id ){

        return this.http.delete<string>(`${environment.apiBaseUrl}/posts/${ id }`, {
            headers : { 'token' : this.authService.retrieveToken() }
        }).pipe(
            catchError( ( err ) => {throw new Error( err )} )
        )

    }

    /**
    * It takes in a data object and an id number, and then it returns an observable of type any
    * @param data - {} - This is the data that we want to update.
    * @param {number} id - The id of the post to be updated.
    * @returns The updated post.
    */
    updatePost( data : {} , id : number ){

        return this.http.put<any>(`${environment.apiBaseUrl}/posts/${ id }`, data , {
            headers : { 'token' : this.authService.retrieveToken() }
        }).pipe(
            catchError( ( err ) => {throw new Error( err )} )
        )

    }



}

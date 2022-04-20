import { Injectable } from '@angular/core';
import { GenericAnimal } from 'src/app/interfaces/genericAnimal';

@Injectable({
    providedIn: 'root'
})
export class GenericAnimalService {



    constructor() { }


    /**
     * It takes in an object and returns a new object with the same properties.
     * @param animal - The animal object that we're trying to parse.
     * @returns An object with the following properties:
     *     id          : animal.id,         
     *     name        : animal.name,      
     *     life_span   : animal.life_span,   
     *     temparament : animal.temparament ,
     *     origin      : animal.origin,    
     *     breed_group : animal.breed_group,
     *     image
     */
    parseToGenericAnimal( animal ): GenericAnimal{

        let image : string = !('image' in animal) ? '' : animal.image.url;

        return {
            id          : animal.id,         
            name        : animal.name,      
            life_span   : animal.life_span,   
            temperament : animal.temperament,   
            breed_group : animal.breed_group,
            image
        }
    }

}

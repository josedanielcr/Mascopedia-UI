import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

    /**
     * If the image is not defined, return a default image. Otherwise, return the image
     * @param {String} image - String - this is the parameter that we are passing into the function.
     * @returns The image url.
     */
    transform( image : String ) : String {
            
        if( !image ){
            return './assets/images/404-dog.jpeg';
        } return image;
    }

}

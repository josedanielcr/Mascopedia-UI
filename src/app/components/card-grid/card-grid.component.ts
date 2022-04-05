import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenericAnimal } from 'src/app/interfaces/genericAnimal';
import { DogsService } from 'src/app/services/animals/dogs.service';

@Component({
    selector: 'app-card-grid',
    templateUrl: './card-grid.component.html',
    styleUrls: ['./card-grid.component.scss']
})
export class CardGridComponent implements OnInit {

    @Input() type             : string;
    data                      : GenericAnimal[];
    isRequestError            : boolean = false;
    requestError              : string;
    @Output() cardGridEmitter = new EventEmitter<any>();

    constructor( private dogsService : DogsService) { }

    /**
    * Get all breeds from the API and store them in the breeds array.
    */
    ngOnInit(): void {

        if( this.type === 'dog') this.getDogBreeds();
        
    }

    /**
     * It calls the getDogs function from the dogsService and passes in the number 10.
     */
    getDogBreeds(){

        this.dogsService.getDogBreeds( 12 ).subscribe({        
            next  : ( data ) => this.data = data,
            error : ( err )  =>  {
                this.isRequestError = true;
                this.requestError = err;
            }
        });
        
    }

    /**
     * Receive data from the parent component and emit it to the child component
     * @param event - The event object that was passed to the callback function.
     */
    receiveData( event ){
        this.cardGridEmitter.emit( event );
    }

}

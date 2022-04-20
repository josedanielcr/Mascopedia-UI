import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenericAnimal } from 'src/app/interfaces/genericAnimal';
import { DogsService } from 'src/app/services/animals/dogs.service';

@Component({
    selector: 'app-card-grid',
    templateUrl: './card-grid.component.html',
    styleUrls: ['./card-grid.component.scss']
})
export class CardGridComponent  {

    @Input()items              : GenericAnimal[];
    isRequestError            : boolean = false;
    requestError              : string;
    @Output() cardGridEmitter = new EventEmitter<any>();

    constructor() { }

    /**
     * Receive data from the parent component and emit it to the child component
     * @param event - The event object that was passed to the callback function.
     */
    receiveData( event ){
        this.cardGridEmitter.emit( event );
    }

}

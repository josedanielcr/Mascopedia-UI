import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenericAnimal } from 'src/app/interfaces/genericAnimal';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

    @Input() data          : GenericAnimal;
    @Output() selectedCard = new EventEmitter<any>();

    constructor() { }

    ngOnInit(): void {    
    }

    exportData( data ){
        this.selectedCard.emit( data );
    }

}

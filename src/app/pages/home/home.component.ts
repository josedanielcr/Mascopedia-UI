import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    data : any = {};

    constructor() { }

    ngOnInit(): void {
    }

    /**
     * Receive card info from the card reader
     * @param event - The event object that was triggered.
     */
    receiveCardInfo( event ){
        this.data = event;
        console.log( this.data );
        
    }

}

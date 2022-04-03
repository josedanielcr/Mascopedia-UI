import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-card-grid',
    templateUrl: './card-grid.component.html',
    styleUrls: ['./card-grid.component.scss']
})
export class CardGridComponent implements OnInit {





    constructor() { }


    /**
    * Get all breeds from the API and store them in the breeds array.
    */
    ngOnInit(): void {
        this.getBreeds();
    }

    getBreeds(){

    }

}

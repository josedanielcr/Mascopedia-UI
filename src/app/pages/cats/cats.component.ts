import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { GenericAnimal } from 'src/app/interfaces/genericAnimal';
import { CatsService } from 'src/app/services/animals/cats.service';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss']
})
export class CatsComponent implements OnInit, OnDestroy {

    data : GenericAnimal[] = [];
    /* A function that is called when the user scrolls. */
    @HostListener('window:scroll', ['$event'])
    onScroll(){

        const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
        const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

        if ( pos > max){

            if(this.catService.loading) return;

            this.catService.getCats( 12 ).subscribe({        
                next  : ( data ) => this.data.push(...data)
            });
            
        }
    }

    constructor( private catService : CatsService ) { }

    ngOnInit(): void {
        this.getCatsBreeds();
    }

    /**
     * We're calling the getCats() function from the CatService class, passing in the number 12 as an
     * argument. 
     */
    getCatsBreeds(){

        this.catService.getCats( 12 ).subscribe({
            next: ( data ) => this.data = data
        })

    }

    /**
     * Receive card info from the card reader
     * @param event - The event object that was triggered.
     */
    receiveCardInfo( event ){
        this.data = event;
        console.log( this.data );
    }

    /**
     * When the user leaves the page, reset the cat page to the first page
     */
    ngOnDestroy(): void {
        this.catService.resetCatPage();
    }

}

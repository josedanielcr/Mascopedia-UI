import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericAnimal } from 'src/app/interfaces/genericAnimal';
import { DogsService } from 'src/app/services/animals/dogs.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{

    data : GenericAnimal[] = [];

    /* A function that is called when the user scrolls. */
    @HostListener('window:scroll', ['$event'])
    onScroll(){

        const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
        const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

        if ( pos > max){

            if(this.dogsService.loading) return;

            this.dogsService.getDogBreeds( 12 ).subscribe({        
                next  : ( data ) => this.data.push(...data)
            });
            
        }
    }

    constructor( private dogsService : DogsService, private router : Router, private activatedRoute : ActivatedRoute ) { }

    ngOnInit(): void {
        this.getDogBreeds();
    }
    /**
     * It calls the getDogs function from the dogsService and passes in the number 10.
     */
    getDogBreeds(){
        this.dogsService.getDogBreeds( 12 ).subscribe({        
            next  : ( data ) => this.data = data,
        });
    }

    /**
     * Receive card info from the card reader
     * @param event - The event object that was triggered.
     */
    receiveCardInfo( event ){
        this.data = event;
        this.router.navigate(['posts', this.data['type'], this.data['id']], {relativeTo : this.activatedRoute});   
    }

    ngOnDestroy(): void {
        this.dogsService.resetPages();
    }


}

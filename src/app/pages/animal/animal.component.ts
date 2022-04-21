import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericAnimal } from 'src/app/interfaces/genericAnimal';
import { CatsService } from 'src/app/services/animals/cats.service';
import { DogsService } from 'src/app/services/animals/dogs.service';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss']
})
export class AnimalComponent implements OnInit {

    public searchedAnimal : string;
    public data : GenericAnimal[] = [];

    constructor( private activatedRouter : ActivatedRoute,
                 private router : Router,
                 private activatedRoute : ActivatedRoute,
                 private dogService : DogsService,
                 private catService : CatsService ) { 
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit(): void {
        this.searchedAnimal = this.activatedRouter.snapshot.params['name'];
        this.getAnimalData();
    }


    getAnimalData(){

        const animal =  this.activatedRouter.snapshot.params['type'] === 'dog' ? 'dog' : 'cat';

        if( animal === 'dog' ){
            this.dogService.getDogByName( this.searchedAnimal ).subscribe({
                next: ( dogs ) => {
                    this.data = dogs;
                }
            });
        } else{
            this.catService.getCatByName( this.searchedAnimal ).subscribe( {
                next: ( cats ) => {
                    this.data = cats;
                }
            } );
        }
    }

    /**
     * Receive card info from the card reader
     * @param event - The event object that was triggered.
     */
    receiveCardInfo( event ){
        this.data = event;
        this.router.navigate(['home/posts', this.data['type'], this.data['id']]);   
    }

}

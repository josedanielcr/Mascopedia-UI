import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

    constructor( private activatedRouter : ActivatedRoute ) { }

    ngOnInit(): void {
        //TODO: borrar estos console log, solo son para demostrar como se sacan los parametros de la ruta
        console.log('id el animal:', this.activatedRouter.snapshot.params['id']);
        console.log('tipo del animal:', this.activatedRouter.snapshot.params['type']);
    }

    //aqui se debe de hacer la logica de mostrar posts del animal seleccionado

}

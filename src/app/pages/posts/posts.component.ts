import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post';
import { AnimalsService } from 'src/app/services/animals/animals.service';
import { PostsService } from 'src/app/services/posts/posts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

    public animalId : string;
    public animalType : string;
    public posts : Post[];

    constructor( private activatedRouter : ActivatedRoute,
                 private router : Router,
                 private postsService : PostsService ) {
        this.animalId = this.activatedRouter.snapshot.params['id'];
        this.animalType = this.activatedRouter.snapshot.params['type']
    }
    

    /**
     * The function is called when the component is initialized. It calls the
     * animalService.getAnimalsByType() function, which returns an observable. The observable is subscribed
     * to, and the next() function is called when the observable returns data. The data is then assigned to
     * the posts variable.
     */
    ngOnInit(): void {
        this.postsService.getAnimalsByType( this.animalId, this.animalType ).subscribe({
            next: ( postsData ) => {
                this.posts = postsData;             
            },
            error : ( err ) => {
                Swal.fire({
                    title: err.error.msg,
                    icon: 'error',
                    timer: 1500,
                    showCloseButton: false,
                    position: 'bottom-left'
                })
            }
        })
    }

    createPost(){
        this.router.navigate(['home/create/post',this.animalId, this.animalType]);
    }


}

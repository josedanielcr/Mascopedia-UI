import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts/posts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-creation',
  templateUrl: './post-creation.component.html',
  styleUrls: ['./post-creation.component.scss']
})
export class PostCreationComponent implements OnInit {

    postForm  : FormGroup;
    errMsg    : string = '';
    executing : boolean = false;
    animalId : string;
    animalType : string;

    constructor( private fb : FormBuilder, 
                 private activatedRouter : ActivatedRoute,
                 private postService : PostsService,
                 private location : Location ) {
        this.animalId = this.activatedRouter.snapshot.params['id'];
        this.animalType = this.activatedRouter.snapshot.params['type'];
        this.createForm();
     }

    ngOnInit(): void {  
    }

    createForm(){
        this.postForm = this.fb.group({
            title       : ['',[ Validators.required ]],
            text        : ['',[ Validators.required , Validators.minLength(100)]],
        });
    }


    submitForm(){
        this.errMsg = '';
        this.executing = true;
    
        if( this.postForm.invalid ){
    
          Object.values( this.postForm.controls ).forEach( control => {
            if( control instanceof FormGroup ){
              Object.values( control.controls ).forEach( control => control.markAsTouched() );
            } else{
              control.markAsTouched();
            }
          })
          this.executing = false;
          return;
        }

        const data = {
            title : this.postForm.controls['title'].value,
            text : this.postForm.controls['text'].value,
            breed : this.animalId,
            breedType : this.animalType,
        }
        
        this.createPost( data );
    }

    createPost( data ){
        
        this.postService.createPost( data ).subscribe({
            next : ( createdPost ) => {
                Swal.fire({
                    title: `Post ${ createdPost['title']} created successfully`,
                    icon:'success',
                    timer: 1500,
                    showCloseButton: false,
                    position: 'bottom-left'
                }).then( () => this.location.back() );
            },
            error : ( err ) => {
                console.log( err );
                
                Swal.fire({
                    title: err.error,
                    icon: 'error',
                    timer: 1500,
                    showCloseButton: false,
                    position: 'bottom-left'
                })
            }
        })
    }
    

    //getters
    get invalidTitle(){
        return this.postForm.get('title').invalid && this.postForm.get('title').touched;
    }
    get inavalidText(){
        return this.postForm.get('text').invalid && this.postForm.get('text').touched;
    }

}

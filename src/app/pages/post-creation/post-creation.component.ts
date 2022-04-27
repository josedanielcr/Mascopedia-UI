import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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

    constructor( private fb : FormBuilder, private activatedRouter : ActivatedRoute ) {
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
        
    }
    

    //getters
    get invalidTitle(){
        return this.postForm.get('title').invalid && this.postForm.get('title').touched;
    }
    get inavalidText(){
        return this.postForm.get('text').invalid && this.postForm.get('text').touched;
    }

}

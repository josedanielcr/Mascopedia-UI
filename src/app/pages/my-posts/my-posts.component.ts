import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableColumns } from 'src/app/interfaces/tableColumn';
import { PostsService } from 'src/app/services/posts/posts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {

    public columns           : TableColumns[];
    public myPosts           : any[];
    public isRefreshingTable : boolean = false;
    public selectedPost      : any;
    public selectedTab       : number = 0;
    postForm                 : FormGroup;
    errMsg                   : string = '';
    executing                : boolean = false;
    executingDelete          : boolean = false;

    constructor( private postService : PostsService,
                 private fb          : FormBuilder ) { }

    /**
     * We're setting the `isRefreshingTable` variable to `true` and then calling the `getMyPosts()`
     * function
     */
    ngOnInit(): void {
        this.createForm();
        this.isRefreshingTable = true;
        this.getMyPosts();
    }

    /**
    * We're creating a form group with two form controls, title and text. The title form control is
    * required, and the text form control is required and must be at least 100 characters long
    */
    createForm(){
        this.postForm = this.fb.group({
            title       : ['',[ Validators.required ]],
            text        : ['',[ Validators.required , Validators.minLength(100)]],
        });
    }

    /**
    * We check if the form is valid, if it is, we update the selectedPost object with the values from the
    * form, and then we call the updatePost() function
    * @returns the value of the selectedPost object.
    */
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

        this.selectedPost['title'] = this.postForm.controls['title'].value;
        this.selectedPost['text'] = this.postForm.controls['text'].value;
        
        this.updatePost();
    }


    updatePost(){

        const data = {
            title : this.selectedPost['title'],
            text : this.selectedPost['text']
        }

        this.postService.updatePost( data, this.selectedPost['id'] ).subscribe({
            next : () => {
                Swal.fire({
                    title: `Post updated successfully`,
                    icon:'success',
                    timer: 1500,
                    showCloseButton: false,
                    position: 'bottom-left'
                }).then( () => {
                    this.postForm.reset();
                    this.selectedTab = 0;
                    this.getMyPosts();
                    this.executing = false;
                });;
            },
            error : ( err ) => {
                Swal.fire({
                    title: `An error has ocurred, please try again`,
                    icon:'error',
                    timer: 1500,
                    showCloseButton: false,
                    position: 'bottom-left'
                })
            }
        })
        
    }


    /**
    * It calls the deletePost() method from the postService, passing the id of the post to be deleted, and
    * subscribes to the observable returned by the method. If the observable returns a value, it means the
    * post was deleted successfully, so it shows a success message and resets the form and the selected
    * tab. If the observable returns an error, it means the post couldn't be deleted, so it shows an error
    * message
    * @param {string} id - The id of the post to be deleted
    */
    deletePost( id : string ){
        
        this.postService.deletePost( id ).subscribe({
            next : () => {
                Swal.fire({
                    title: `Post deleted successfully`,
                    icon:'success',
                    timer: 1500,
                    showCloseButton: false,
                    position: 'bottom-left'
                }).then( () => {
                    this.postForm.reset();
                    this.selectedTab = 0;
                    this.getMyPosts();
                    this.executing = false;
                });;
            },
            error : ( err ) => {
                Swal.fire({
                    title: `An error has ocurred, please try again`,
                    icon:'error',
                    timer: 1500,
                    showCloseButton: false,
                    position: 'bottom-left'
                })
            }
        })
        
    }

    /**
    * We're calling the getMyPosts() function from the postService, which returns an observable. We
    * subscribe to that observable, and when the observable returns data, we set the myPosts variable to
    * the data returned, and then call the getColumns() function
    */
    getMyPosts(){
        this.postService.getMyPosts().subscribe({
            next : ( data ) => {
                this.myPosts = data;
                this.getColumns();
                this.isRefreshingTable = false;
            },
            error : () => {}
        })
    }


    getColumns(){
        this.columns = [
            {
              columnDef: 'title',
              header: 'Title',
              cell: (element: any) => `${element['title']}`,
            },
            {
                columnDef: 'breedType',
                header: 'Breed type',
                cell: (element: any) => `${element['breedType']}`,
            }

          ];
    }

    /**
     * The function takes an event as an argument, and sets the selectedPost property to the event
     * @param {Event} event - The event that was triggered by the user.
     */
    saveRow( event : Event ){
        this.selectedPost = event;
        this.selectedTab = 1;
    }

    //getters
    get invalidTitle(){
        return this.postForm.get('title').invalid && this.postForm.get('title').touched;
    }
    get inavalidText(){
        return this.postForm.get('text').invalid && this.postForm.get('text').touched;
    }

}

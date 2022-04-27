import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post';

@Component({
  selector: 'app-post-grid',
  templateUrl: './post-grid.component.html',
  styleUrls: ['./post-grid.component.scss']
})
export class PostGridComponent implements OnInit {

    @Input() posts : Post[];

    constructor() { }

    ngOnInit(): void {
    }
    
}

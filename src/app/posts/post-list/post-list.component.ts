import { Component, Input } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  // posts = [
  //   {title: 'First post', content: 'Content of first post!'},
  //   {title: 'Second post', content: 'Content of second post!'},
  //   {title: 'Third post', content: 'Content of third post!'}
  // ]

  @Input() posts: Post[] = [];

}
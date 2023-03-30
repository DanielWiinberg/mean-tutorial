import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: 'post-create.component.html',
  styleUrls: ['post-create.component.css']
})
export class PostCreateComponent {
  postTitle = '';
  postContent = '';

  constructor(private postsService: PostsService){}

  onCreatePost(postForm: NgForm){
    if(!postForm.valid) return;
    this.postsService.addPost(postForm.value.title, postForm.value.content);
    postForm.resetForm();
  }

}

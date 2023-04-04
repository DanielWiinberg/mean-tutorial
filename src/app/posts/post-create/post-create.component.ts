import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: 'post-create.component.html',
  styleUrls: ['post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  postTitle = '';
  postContent = '';
  private mode: string = 'create';
  private postId: string | undefined;
  post: Post;

  constructor(
    private postsService: PostsService, 
    public route: ActivatedRoute){

    }

  ngOnInit(): void {
  // Built-in observable, no need to unsubscribe
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.post = {id: postData._id, title: postData.title, content: postData.content};
        });
      }else{
        this.mode = 'create';
        this.postId = null;
      }
    }); 
  }

  onSavePost(postForm: NgForm){
    if(!postForm.valid) return;

    if(this.mode === 'create'){
      this.postsService.addPost(postForm.value.title, postForm.value.content);
    }else{
      this.postsService.updatePost(this.postId, postForm.value.title, postForm.value.content);
    }

    postForm.resetForm();
  }

}

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
  posts: Post[] = [];
  postUpdateSubscription: Subscription;
  isLoading: boolean = false;

  constructor(private postsService: PostsService){
  }
  
  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postUpdateSubscription = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    this.postUpdateSubscription.unsubscribe();
  }

  onDeletePost(postId: string){
    this.postsService.deletePost(postId);
  }
}

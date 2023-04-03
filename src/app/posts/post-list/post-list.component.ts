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

  constructor(private postsService: PostsService){
  }
  
  ngOnInit(): void {
    this.postsService.getPosts();
    this.postUpdateSubscription = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
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

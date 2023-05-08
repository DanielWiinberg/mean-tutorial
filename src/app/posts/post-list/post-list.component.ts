import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{
  posts: Post[] = [];
  postUpdateSubscription: Subscription;
  isLoading: boolean = false;
  totalPosts = 10;
  postsPerPage = 2;
  pageSizeOptions = [1, 2, 5, 10];
  private authStatusSubscription: Subscription;
  private userIsAuthenticated: boolean = false;

  constructor(private postsService: PostsService, private authService: AuthService){
  }
  
  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postUpdateSubscription = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    });

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSubscription = this.authService.getAuthStatusListenerObservable().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy(): void {
    this.postUpdateSubscription.unsubscribe();
    this.authStatusSubscription.unsubscribe();
  }

  onDeletePost(postId: string){
    this.postsService.deletePost(postId);
  }

  onChangedPage(pageEvent: PageEvent){
    console.log(pageEvent);
    
  }
}

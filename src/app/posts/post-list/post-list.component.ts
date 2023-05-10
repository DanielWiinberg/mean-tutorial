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
  totalPosts = 0;
  postsPerPage = 2;
  pageSizeOptions = [1, 2, 5, 10];
  currentPage = 1;
  private authStatusSubscription: Subscription;
  private userIsAuthenticated: boolean = false;

  constructor(private postsService: PostsService, private authService: AuthService){
  }
  
  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postUpdateSubscription = this.postsService.getPostUpdateListener()
    .subscribe((postData: {posts: Post[], totalPosts: number}) => {
      this.isLoading = false;
      this.posts = postData.posts;
      this.postsPerPage = postData.totalPosts;
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
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  onChangedPage(pageEvent: PageEvent){
    this.isLoading = true;
    this.currentPage = pageEvent.pageIndex + 1;
    this.postsPerPage = pageEvent.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }
}

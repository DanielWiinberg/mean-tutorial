import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'; 
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
const BACKEND_URL = environment.apiUrl + '/posts/';

@Injectable({providedIn: 'root'})
export class PostsService{
  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts: Post[], totalPosts: number}>();

  constructor(
    private http: HttpClient,
    private router: Router) {

  }

  public getPost(postId: string){
    return this.http.get<{_id: string, title: string, content: string, imagePath: string}>
      (BACKEND_URL + postId);
  }

  public getPosts(postsPerPage: number, currentPage: number){
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;

    this.http
      .get<{ message: string; fetchedPosts: any; totalPosts: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.fetchedPosts.map(post => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath
              };
            }),
            totalPosts: postData.totalPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          totalPosts: transformedPostData.totalPosts
        });
      });
  }

  public getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  public addPost(title: string, content: string, image: File){
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);

    this.http.post<{message: string, post: Post}>(
      BACKEND_URL, 
      postData)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  public deletePost(postId: string){
    return this.http.delete(BACKEND_URL + postId);
  }

  public updatePost(id: string, title: string, content: string, image: File | string){
    let postData: Post | FormData;

    if (typeof(image) === 'object'){
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    };

    if (typeof(image) === 'string'){
      postData = {
        id: id, 
        title: title, 
        content: content, 
        imagePath: image
      };
    };

    this.http.put(BACKEND_URL + id, postData)
    .subscribe(() => {
      this.router.navigate(['/']);
    })
  }

}
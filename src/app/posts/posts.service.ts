import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'; 
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService{
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {

  }

  public getPost(postId: string){
    return this.http.get<{_id: string, title: string, content: string}>
      ('http://localhost:3000/api/posts/' + postId);
  }

  public getPosts(){
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map(postData => {
      return postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        }
      })
    }))
    .subscribe((transformedPosts) => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts])
    });
  }

  public getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  public addPost(postTitle: string, postContent: string){
    const post: Post = {id: null, title: postTitle, content: postContent};

    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
    .subscribe((responseData) => {
      const postId = responseData.postId;
      post.id = postId;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }

  public deletePost(postId: string){
    this.http.delete('http://localhost:3000/api/posts/' + postId)
    .subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  public updatePost(postId: string, postTitle: string, postContent: string){
    const post: Post = {id: postId, title: postTitle, content: postContent};
    this.http.put('http://localhost:3000/api/posts/' + postId, post).subscribe(response => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === postId);
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    })
  }

}
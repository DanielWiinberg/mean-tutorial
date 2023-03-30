import { Injectable } from '@angular/core'
import { Subject } from 'rxjs';

import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService{
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  public getPosts(){
    return [...this.posts];
  }

  public getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  public addPost(postTitle: string, postContent: string){
    const post: Post = {title: postTitle, content: postContent}
    this.posts.push(post);
    this.postsUpdated.next(this.getPosts());
  }

}
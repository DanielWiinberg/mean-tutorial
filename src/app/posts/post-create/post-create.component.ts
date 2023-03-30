import { Component } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: 'post-create.component.html',
  styleUrls: ['post-create.component.css']
})
export class PostCreateComponent {
  userPost: string = '';

  onSavePost(comment: HTMLTextAreaElement){
    this.userPost = comment.value;
  }

}

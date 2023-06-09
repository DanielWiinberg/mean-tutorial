import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';

import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent
  ],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class PostsModule{

}
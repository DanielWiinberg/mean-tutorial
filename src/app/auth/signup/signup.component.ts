import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{
  isLoading = false;

  onSignup(loginForm: NgForm){
    console.log(loginForm.value);
    
  }
}
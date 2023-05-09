import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthService{
  private isAuthenticated: boolean = false;
  private token: string;
  private tokenTimer: NodeJS.Timer;
  private authStatusListener = new Subject<boolean>();
  
  constructor(private http: HttpClient, private router: Router){

  }

  getToken(){
    return this.token;
  }

  getAuthStatusListenerObservable(){
    return this.authStatusListener.asObservable();
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  createUser(email: string, password: string){
    const authData: AuthData = {
      email: email,
      password: password
    };

    this.http.post('http://localhost:3000/api/users/signup', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  loginUser(email: string, password: string){
    const authData: AuthData = {
      email: email,
      password: password
    };

    this.http.post<{token: string, expiresIn: number}>('http://localhost:3000/api/users/login', authData)
      .subscribe(response => {
        console.log('Login user response: ', response);
        const token = response.token;
        this.token = token;
        if(token){
          const expireDuration = response.expiresIn;
          this.setAuthTimer(expireDuration);

          const now = new Date();
          const expirationDate = new Date(now.getTime() + expireDuration * 1000);
          this.saveAuthData(token, expirationDate);

          this.isAuthenticated = true;
          this.authStatusListener.next(true);
        }
    });

    this.router.navigate(['/']);
  }

  autoAuthUser(){
    const authInfo = this.getAuthData();
    if(!authInfo) return;

    const now = new Date();
    const expiresIn =  authInfo.expirationDate.getTime() - now.getTime();
    console.log(authInfo, expiresIn);

    if(expiresIn > 0){
      this.token = authInfo.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/']);
    clearTimeout(this.tokenTimer);
  }

  private saveAuthData(token: string, expirationDate: Date){
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData(){
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');

    if(!token || !expirationDate){
      return;
    }

    return {token: token, expirationDate: new Date(expirationDate)};
  }

  private setAuthTimer(duration: number){
    console.log('Setting timer: ' + duration);
    
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
}
import { Injectable } from '@angular/core';
import { map,catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable,throwError } from 'rxjs';
import {UserModule} from '../module/user.module';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSub : BehaviorSubject<UserModule>;
  private currectUser : Observable<UserModule>;
  private baseUrl:string;
  constructor(private http:HttpClient) { 
    this.currentUserSub = new BehaviorSubject<UserModule>(JSON.parse(localStorage.getItem('currectUser')));
    this.currectUser  = this.currentUserSub.asObservable();
    this.baseUrl = "http://localhost:3000/logauth";
  }

  currentUserValue():UserModule{
    return this.currentUserSub.value;
  }

  login(email,password){
    
    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');
    this.http.post(this.baseUrl,{'email':email,'password':password}).subscribe(user => {
      // login successful if there's a jwt token in the response
      if (user) {
        
        localStorage.setItem('isLoggedin','1');
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
      }
      else{
        return false;
      }
      
    });
    
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import {UserModule} from '../module/user.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl : string = "http://localhost:3000/list";
  constructor(private http:HttpClient) { }
  getUser(){
    return this.http.get<UserModule[]>(this.baseUrl);
  }

}

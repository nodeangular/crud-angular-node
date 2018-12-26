import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {AuthenticationService} from '../_service/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;

  constructor(private fb:FormBuilder, private router: Router,private authenticationservice:AuthenticationService) { 
    if(this.authenticationservice.currentUserValue){
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    });
  }

  onSubmit(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    if(this.loginForm.controls.email.value && this.loginForm.controls.password.value){
       
        console.log(this.authenticationservice.login(this.loginForm.controls.email.value,this.loginForm.controls.password.value));
        if(this.authenticationservice.login(this.loginForm.controls.email.value,this.loginForm.controls.password.value)){
          this.router.navigate(['/dashboard']);
        }
        else{
          this.invalidLogin =false;
        }
    }
  }


}

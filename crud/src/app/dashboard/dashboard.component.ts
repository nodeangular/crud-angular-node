import { Component, OnInit } from '@angular/core';
import {UserService} from '../_service/user.service';
import {UserModule} from '../module/user.module';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users:UserModule[];
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe(data=>this.users=data);
  }

}

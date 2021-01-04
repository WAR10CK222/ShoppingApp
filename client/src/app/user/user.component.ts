import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  loginReq = {
    email: undefined,
    password: undefined
  };
  constructor(private userService: UserService) { }

  ngOnInit() {}
  loginUser() {
    this.userService.loginUser(this.loginReq)
      .subscribe(status => console.log(status));
  }
}
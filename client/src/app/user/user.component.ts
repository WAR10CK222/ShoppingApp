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
      .subscribe(status => {
        if(Object.keys(this.userService.loggedInUser).length === 0){
          this.userService.loggedInUser = status;
          // console.log(this.userService.loggedInUser);
        } else {
          // console.log("Not working now",this.userService.loggedInUser);
          return;
        }
        
      });
  }
}
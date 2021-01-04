import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private userService: UserService, public router: Router) { }
  
  ngOnInit() {}
  loginUser() {
    this.userService.loginUser(this.loginReq)
      .subscribe(user => {
        console.log(this.userService.isLoggedIn);
        console.log(this.userService.loggedInUser);
        if(!this.userService.isLoggedIn){
          this.userService.loggedInUser = user;
          localStorage.setItem("users" , JSON.stringify(user));
          this.userService.isLoggedIn = true;
        }
        console.log(this.userService.isLoggedIn);
        console.log(this.userService.loggedInUser);
      });
      this.router.navigate(['/grocery']);
  }
}
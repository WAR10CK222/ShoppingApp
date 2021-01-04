import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private userService: UserService, public router: Router) { }
  registerUser = {
    username: undefined,
    email: undefined,
    password: undefined,
    phone: undefined
  }
  
  ngOnInit() {}
  postUser() {
    if(!this.userService.isLoggedIn){
      this.userService.createUser(this.registerUser)
        .subscribe(user => {
          this.userService.loggedInUser = user;
          localStorage.setItem("users" , JSON.stringify(user));
          this.userService.isLoggedIn = true;
          // console.log(this.userService.loggedInUser);
        });
    } else {
      // console.log(this.userService.loggedInUser);
      console.log('Already logged in');
    }
    this.router.navigate(['/grocery']);
  }
}

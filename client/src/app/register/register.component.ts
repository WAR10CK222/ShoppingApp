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
    if(!(this.registerUser.email === undefined || this.registerUser.password === undefined || this.registerUser.phone === undefined || this.registerUser.phone === undefined)){
      if(!this.userService.isLoggedIn){
        this.userService.createUser(this.registerUser)
          .subscribe((user) => {
            this.userService.loggedInUser = user;
            localStorage.setItem("users" , JSON.stringify(user));
            this.userService.isLoggedIn = true;
            window.alert('Registered Successful !!');
            // console.log(this.userService.loggedInUser);
            this.router.navigate(['/grocery']);
          });
      } else {
        // console.log(this.userService.loggedInUser);
        window.alert('Already logged in');
        this.router.navigate(['/grocery']);
      }
    } else {
      window.alert('Required Credentials not provided');
      this.router.navigate(['/register']);
    }
  }
}

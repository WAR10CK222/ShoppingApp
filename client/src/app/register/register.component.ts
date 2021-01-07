import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import Swal from 'sweetalert2';

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
        let usr : any;
        let err : any;
        this.userService.createUser(this.registerUser)
          .subscribe((user) => {
            usr = user;
            this.userService.loggedInUser = usr.user;
            localStorage.setItem("users" , JSON.stringify(usr.user));
            this.userService.isLoggedIn = true;
            Swal.fire(usr.message);
            // console.log(this.userService.loggedInUser);
            this.router.navigate(['/grocery']);
          }, error => {
            err : error;
            Swal.fire(err.error.message, 'error');
          });
      } else {
        // console.log(this.userService.loggedInUser);
        Swal.fire('Already logged in');
        this.router.navigate(['/grocery']);
      }
    } else {
      Swal.fire('Required Credentials not provided', 'error');
      this.router.navigate(['/register']);
    }
  }
}

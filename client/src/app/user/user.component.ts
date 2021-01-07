import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import Swal from 'sweetalert2';

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
    if(!(this.loginReq.email === undefined || this.loginReq.password === undefined)){
      if(!this.userService.isLoggedIn){
        let usr : any;
        let err : any;
        this.userService.loginUser(this.loginReq)
          .subscribe(user => {
              usr = user;
              this.userService.loggedInUser = usr.user;
              localStorage.setItem("users" , JSON.stringify(usr.user)); 
              this.userService.isLoggedIn = true;
              Swal.fire(usr.message);
              this.router.navigate(['/grocery']);
          }, error => {
            err = error;
            Swal.fire(err.error.message, 'error');
          });
      } else {
        Swal.fire('Already Logged in!!');
        this.router.navigate(['/grocery']);
        this.router.navigate(['/login']);
      }
    } else {
      Swal.fire('Required Credentials not provided !!', 'error');
      this.router.navigate(['/login']);
    }
  }
}
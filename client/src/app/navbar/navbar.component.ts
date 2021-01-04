import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public userService: UserService) { }
  isLoggedOut: any;
  isLoggedIn : any;
  ngOnInit(): void {
    this.checkLogin();
  }

  logout(){
    this.userService.loggedInUser = {};
    this.checkLogin();
    console.log(this.userService.loggedInUser);
  }

  checkLogin() {
    if(this.userService.loggedInUser === {}){
      this.isLoggedIn = false;
      this.isLoggedOut = true;
    } else {
      this.isLoggedIn = true;
      this.isLoggedOut = false;
    }
  }

  showLoginSignup(){

  }

}

//
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../shared/order.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public userService: UserService, public router: Router, public orderService : OrderService) { }
  isLoggedIn : boolean = false;
  ngOnInit(){
    this.isLoggedIn = this.userService.isLoggedIn;
  }
  hideThumbnail(){
    if(localStorage.getItem("users") === null){
        return true;
    } else {
      return false;
    }
  }

  showThumbnail(){
    if(localStorage.getItem("users") !== null){
      return true;
    } else {
      return false;
    }
  }

  logout() {
    if(localStorage.getItem("users")){
      // console.log(this.userService.isLoggedIn);
      // console.log(this.userService.loggedInUser);
      this.userService.loggedInUser = {};
      localStorage.removeItem("users");
      this.userService.isLoggedIn = false;
      this.orderService.cartItems = [];
      window.alert('Logged you out !!');
      // console.log(this.userService.isLoggedIn);
      // console.log(this.userService.loggedInUser);
      this.router.navigate(['/grocery']);
    } else {
      window.alert('Login First ;)');
    }
  }

}

//
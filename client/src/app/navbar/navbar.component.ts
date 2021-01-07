import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../shared/order.service';
import { UserService } from '../shared/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public userService: UserService, public router: Router, public orderService : OrderService) { }
  isLoggedIn : boolean = false;
  username : string = "";
  ngOnInit(){
    this.isLoggedIn = this.userService.isLoggedIn;
  }
  hideThumbnail(){
    if(localStorage.getItem("users") === null){ 
      this.username = "";
      return true;
    } else {
      this.username = JSON.parse(localStorage['users'])['username']; 
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
      localStorage['cart'] = "";
      Swal.fire('Logged you out !!', 'error');
      // console.log(this.userService.isLoggedIn);
      // console.log(this.userService.loggedInUser);
      this.router.navigate(['/grocery']);
    } else {
      Swal.fire('Login First ;)');
    }
  }

}

//
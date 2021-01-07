import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../shared/order.service';
import { UserService } from '../shared/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService : UserService, private router : Router, private orderService : OrderService) { }

  user : any;
  userOrder : Object = {};
  ngOnInit(): void {
    if(!this.userService.isLoggedIn === true){
      Swal.fire('Login First !!', 'error');
      this.router.navigate(['/login']);
    } else {
      this.user = JSON.parse(localStorage['users']);
      console.log('From here ->');
      console.log(`${this.user._id}`);
      this.orderService.loadOrder(this.user._id).subscribe(orders => {
        console.log(orders);
        this.userOrder = orders;
        console.log(this.userOrder);
      }); 
    }
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../shared/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  newOrder = {
    userId: undefined,
    items : [] as any
  }
  
  user = "";
  totalAmount = 0;
  emptyCart = "";
  sentOrder: any;

  constructor(public orderService: OrderService, public router: Router) { }

  ngOnInit(){
    this.orderService.cartItems = JSON.parse(localStorage['cart']);
    console.log(this.orderService.cartItems);
    if(this.orderService.cartItems.length === 0){
      this.emptyCart = "Cart is Empty";
      this.totalAmount = 0;
      // Swal.fire({
      //   icon: 'error',
      //   text: 'Empty Cart'
      // });
      // this.router.navigate(['/grocery']);
    }
    //this.emptyCart = "";
    this.findTotal();
    if(localStorage['users'] !== undefined){
      this.user = JSON.parse(localStorage['users']).username
    }
  }

  findTotal() {
    for(let i = 0; i < this.orderService.cartItems.length; i++){
      this.totalAmount+=this.orderService.cartItems[i]['price'];
    }
  }

  postOrder(){
    let err : any;
    if(this.orderService.cartItems.length === 0){
      Swal.fire({
        icon: 'error',
        text: 'First Add some items'
      });
      this.router.navigate(['/grocery']);
    } else {
      if(!localStorage['users']) {
        Swal.fire({
          icon: 'error',
          text: 'Login First'
        });
        this.router.navigate(['/login']);
      }
      else {
        
        this.newOrder['userId'] = JSON.parse(localStorage['users'])['_id'];
        for(let i = 0; i < this.orderService.cartItems.length; i++){
          this.newOrder.items.push(this.orderService.cartItems[i]['_id']);
        }
        // console.log(this.newOrder);
        this.orderService.sendOrder(this.newOrder)
          .subscribe(result => {
            this.sentOrder = result;
            Swal.fire({
              icon : 'success',
              title: 'Order Sent Succesfully'
            });
            console.log(this.sentOrder.loggedOrder);
            // console.log(this.sentOrder.loggedOrder);
            // Swal.fire(this.sentOrder.message);
          }, error => {
            err = error;
            Swal.fire({
              icon: 'error',
              text: err.error.message
            });
          }); 
        this.clearOrder();
      }
    }
  }

  clearOrder(){
    this.orderService.cartItems = [];
    this.totalAmount = 0;
    this.emptyCart = "Cart is Empty";
    localStorage['cart'] = "[]";
  }

}

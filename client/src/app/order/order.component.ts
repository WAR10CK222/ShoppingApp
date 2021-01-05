import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../shared/order.service';

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

  constructor(public orderService: OrderService, public router: Router) { }

  ngOnInit(){
    if(this.orderService.cartItems.length === 0){
      window.alert('Empty Cart !!');
      this.router.navigate(['/grocery']);
    }
    this.emptyCart = "";
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
    if(this.orderService.cartItems.length === 0){
      window.alert('First Add some items !!');
      this.router.navigate(['/grocery']);
    } else {
      if(!localStorage['users']) {
        window.alert('Login First');
        this.router.navigate(['/login']);
      }
      else {
        window.alert('Order Sent Succesfully');
        this.newOrder['userId'] = JSON.parse(localStorage['users'])['_id'];
        for(let i = 0; i < this.orderService.cartItems.length; i++){
          this.newOrder.items.push(this.orderService.cartItems[i]['_id']);
        }
        // console.log(this.newOrder);
        this.orderService.sendOrder(this.newOrder)
          .subscribe(result => console.log(result) ); 
      }
    }
  }

  clearOrder(){
    this.orderService.cartItems = [];
    this.totalAmount = 0;
    this.emptyCart = "Cart is Empty";
  }

}

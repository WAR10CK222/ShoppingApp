import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Grocery } from '../shared/grocery.model';
import { GroceryService } from '../shared/grocery.service';
import { OrderService } from '../shared/order.service';
import { UserService } from '../shared/user.service';


@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.css'],
  providers: []
})
export class GroceryComponent implements OnInit {
//JSON format : [{"name":"blahblah", "_id":, "price", "quantity", "image_url": },{"name":"blahblah", "_id":, "price", "quantity", "image_url": },{"name":"blahblah", "_id":, "price", "quantity", "image_url": }]
title="List of Groceries";

loggedGroceries: any;
  constructor(private groceryService: GroceryService, private _route: ActivatedRoute, private _router: Router, public orderService : OrderService, private userService : UserService) { }
  
  ngOnInit() {
    localStorage['cart'] = JSON.stringify(this.orderService.cartItems);
    localStorage['isLoggedIn'] = JSON.stringify(this.userService.isLoggedIn);
    this.groceryService.getGrocery()
      .subscribe((groceries => {
        let temp = groceries;
        this.loggedGroceries = temp;
      }))
  }

  addToCart(grocery: any){
    // this._router.navigate(['/cart', grocery]);
    this.orderService.cartItems.push(grocery);
    localStorage['cart'] = JSON.stringify(this.orderService.cartItems);
    console.log("Added to Cartitems: ",this.orderService.cartItems);
  };
}
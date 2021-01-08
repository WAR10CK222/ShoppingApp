import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Grocery } from '../shared/grocery.model';
import { GroceryService } from '../shared/grocery.service';
import { OrderService } from '../shared/order.service';


@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.css'],
  providers: []
})
export class GroceryComponent implements OnInit {
//JSON format : [{"name":"blahblah", "_id":, "price", "quantity", "image_url": },{"name":"blahblah", "_id":, "price", "quantity", "image_url": },{"name":"blahblah", "_id":, "price", "quantity", "image_url": }]
title="List of Groceries";
  
// groceries=[
//     {"name":"Apples", "_id":123, "price":2, "quantity":1, "image_url": 'https://images-na.ssl-images-amazon.com/images/I/81vo%2B9JNpIL._SL1500_.jpg' },
//     {"name":"Bananas", "_id":132, "price":1, "quantity":1, "image_url": 'https://images-na.ssl-images-amazon.com/images/I/81vo%2B9JNpIL._SL1500_.jpg'},
//     {"name":"Kiwis", "_id":1233, "price":3, "quantity":2, "image_url": 'https://images-na.ssl-images-amazon.com/images/I/81vo%2B9JNpIL._SL1500_.jpg'}
//   ];
loggedGroceries: any;
  constructor(private groceryService: GroceryService, private _route: ActivatedRoute, private _router: Router, public orderService : OrderService) { }
  
  ngOnInit() {
    localStorage.setItem('cart', "[]");
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
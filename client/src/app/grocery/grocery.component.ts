import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.css'],
  providers: []
})
export class GroceryComponent implements OnInit {
//JSON format : [{"name":"blahblah", "_id":, "price", "quantity", "image_url": },{"name":"blahblah", "_id":, "price", "quantity", "image_url": },{"name":"blahblah", "_id":, "price", "quantity", "image_url": }]
title="List of Groceries";
  
groceries=[
    {"name":"Apples", "_id":123, "price":2, "quantity":1, "image_url": 'https://images-na.ssl-images-amazon.com/images/I/81vo%2B9JNpIL._SL1500_.jpg' },
    {"name":"Bananas", "_id":132, "price":1, "quantity":1, "image_url": 'https://images-na.ssl-images-amazon.com/images/I/81vo%2B9JNpIL._SL1500_.jpg'},
    {"name":"Kiwis", "_id":1233, "price":3, "quantity":2, "image_url": 'https://images-na.ssl-images-amazon.com/images/I/81vo%2B9JNpIL._SL1500_.jpg'}
  ];
  constructor() { }
  
  ngOnInit() {
  }
}
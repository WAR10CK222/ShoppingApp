import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  newOrder = {
    userId: undefined,
    items: []
  }

  

  constructor(private orderService: OrderService) { }

  ngOnInit(){}

  postOrder(){
    this.orderService.sendOrder(this.newOrder)
      .subscribe(result => console.log(result) );
  }

  clearOrder(){
    this.newOrder.items = [];
  }

}

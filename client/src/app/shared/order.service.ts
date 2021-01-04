import { Injectable } from '@angular/core';
import { WebService } from '../web.service';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  cartItems: any = [];

  constructor(private webService: WebService) {}

  sendOrder(newOrder : {}) {
    return this.webService.post('api/order', newOrder);
  }
}

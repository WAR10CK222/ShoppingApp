import { Injectable } from '@angular/core';
import { WebService } from '../web.service';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  cartItems: any = [];

  constructor(private webService: WebService) {}
  loadOrder(userid: string) {
    return this.webService.get(`api/order/find/${userid}`);
  }
  sendOrder(newOrder: object) {
    return this.webService.post('api/order', newOrder);
  }
}

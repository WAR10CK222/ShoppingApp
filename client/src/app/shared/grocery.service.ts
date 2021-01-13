import { Injectable } from '@angular/core';
import { Grocery } from './grocery.model';
import { WebService } from '../web.service';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  constructor(private webService: WebService) {}

  getGrocery(){
    return this.webService.get('api/groceries');
  }

  createGrocery(newGrocery : Object){
    return this.webService.post('api/groceries', newGrocery);
  }
}

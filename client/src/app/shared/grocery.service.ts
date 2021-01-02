import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Grocery } from './grocery.model';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  readonly ROOT_URL;
  constructor(url: string) {
    this.ROOT_URL = 'https://localhost:3000/api/users';
  }
}

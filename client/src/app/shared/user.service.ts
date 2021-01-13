import { Injectable } from '@angular/core';
import { WebService } from '../web.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private webService: WebService) {}
  loggedInUser: any = {};
  isLoggedIn: boolean = false;
  getUsers() {
    return this.webService.get('api/users/');
  }

  loginUser(loginUser: {}) {
    return this.webService.post('api/users/login', loginUser);
  }

  checkPassword(userId : string, password : string) {
    return this.webService.post(`api/users/${userId}`, { password : password });
  }

  createUser(newUser: {}) {
    return this.webService.post('api/users/', newUser);
  }

  updateUser(userId: string, updatedUser: Object) {
    return this.webService.patch(`api/users/${userId}`, updatedUser);
  }

  deleteUser(userId: string) {
    return this.webService.delete(`api/users/${userId}`);
  }
}

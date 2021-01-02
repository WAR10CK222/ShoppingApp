import { Injectable } from '@angular/core';
import { WebService } from '../web.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private webService: WebService) {}

  getUsers() {
    return this.webService.get('api/users');
  }

  createUser(newUser: User) {
    return this.webService.post('api/users', newUser);
  }

  updateUser(userId: string, updatedUser: User) {
    return this.webService.patch(`api/users/${userId}`, updatedUser);
  }

  deleteUser(userId: string) {
    return this.webService.delete(`api/users/${userId}`);
  }
}

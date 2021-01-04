import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private userService: UserService) { }
  registerUser = {
    username: undefined,
    email: undefined,
    password: undefined,
    phone: undefined
  }
  
  ngOnInit() {}
  postUser() {
    this.userService.createUser(this.registerUser)
      .subscribe();
  }
}

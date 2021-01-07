import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  loginReq = {
    email : undefined,
    password :  undefined
  };

  userForm: FormGroup;
  submitted = false;
  constructor(private userService: UserService, public router: Router, private formBuilder: FormBuilder) {}
  
  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]
    });
  }

  get f() { return this.userForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log('submitted');
    this.loginUser();

    // stop here if form is invalid
    if (this.userForm.invalid) {
        return;
    }
  }
  
  loginUser() {
    if(!(this.loginReq.email === undefined || this.loginReq.password === undefined)){
      if(!this.userService.isLoggedIn){
        let usr : any;
        let err : any;
        this.userService.loginUser(this.loginReq)
          .subscribe(user => {
              usr = user;
              this.userService.loggedInUser = usr.user;
              localStorage.setItem("users" , JSON.stringify(usr.user)); 
              this.userService.isLoggedIn = true;
              Swal.fire(usr.message);
              this.router.navigate(['/grocery']);
          }, error => {
            err = error;
            Swal.fire({
              icon: 'error',
              text: err.error.message
            });
          });
      } else {
        Swal.fire('Already Logged in!!');
        this.router.navigate(['/grocery']);
        this.router.navigate(['/login']);
      }
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Required Credentials not provided'
      });
      this.router.navigate(['/login']);
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(private userService: UserService, public router: Router, private formBuilder: FormBuilder) { }
  registerUser = {
    username: undefined,
    email: undefined,
    password: undefined,
    phone: undefined
  }
  
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      phone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    if (this.registerForm.valid) {
      console.log('submitted');
      this.postUser();
    }
  }

  postUser() {
    if(!(this.registerUser.email === undefined || this.registerUser.password === undefined || this.registerUser.phone === undefined || this.registerUser.phone === undefined)){
      if(!this.userService.isLoggedIn){
        let usr : any;
        let err : any;
        this.userService.createUser(this.registerUser)
          .subscribe((user) => {
            usr = user;
            this.userService.loggedInUser = usr.user;
            localStorage.setItem("users" , JSON.stringify(usr.user));
            this.userService.isLoggedIn = true;
            localStorage.setItem("isLoggedIn", JSON.stringify(true));
            Swal.fire(usr.message);
            // console.log(this.userService.loggedInUser);
            this.router.navigate(['/grocery']);
          }, error => {
            err : error;
            Swal.fire({
              icon: 'error',
              text: err.error.message
            });
          });
      } else {
        // console.log(this.userService.loggedInUser);
        Swal.fire('Already logged in');
        this.router.navigate(['/grocery']);
      }
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Required Credentials not provided'
      });
      this.router.navigate(['/register']);
    }
  }
}

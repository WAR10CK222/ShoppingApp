import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  editForm : FormGroup;
  submitted = false;
  user : any;
  userId : string = "";
  updatedUser : Object = {};

  constructor(private userService : UserService, public router: Router, private formBuilder: FormBuilder) { }

  

  ngOnInit() {
    if(!this.userService.isLoggedIn){
      Swal.fire({
        icon : 'error',
        title : 'Login First'
      })
      this.router.navigate(['/login']);
    } else {
      this.user = JSON.parse(localStorage['users']);
      this.userId = JSON.parse(localStorage['users'])['_id'];
      this.updatedUser = this.user;
      console.log(this.user, this.userId, this.updatedUser);
      this.editForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
        email: ['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
        phone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
      });
      this.editForm.controls['username'].setValue(this.user.username);
      this.editForm.controls['email'].setValue(this.user.email);
      this.editForm.controls['phone'].setValue(this.user.phone);
    }
  }
  get f() { return this.editForm.controls; }

  
  onDelete() {
    Swal.fire({
      icon: 'warning',
      title : 'Are you sure to delete user?',
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: "Don't delete"
    }).then(result => {
      if(result.isConfirmed) {
        this.deleteUser();
      } else if(result.isDenied) {
        Swal.fire({
          icon : 'info',
          title: 'User Not Deleted'
        });
      }
    })
  }

  onSubmit() {
    console.log(this.editForm.value);
    this.updatedUser = this.editForm.value;
    console.log('Updated User', this.updatedUser);
    this.submitted = true;

    // stop here if form is invalid
    if (this.editForm.invalid) {
        return;
    }
    if (this.editForm.valid) {
      console.log('submitted');
      Swal.fire({
        icon: 'warning',
        title : 'Update Profile ?',
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: 'Update',
        denyButtonText: "Don't update"
      }).then(result => {
        if(result.isConfirmed) {
          this.updateUser();
        } else if(result.isDenied) {
          Swal.fire({
            icon : 'info',
            title: 'User Not Updated'
          });
          this.router.navigate(['/profile']);
        }
      })
    }
  }

  updateUser(){
    if(!this.userService.isLoggedIn){
      Swal.fire({
        icon: 'error',
        title: 'Login First'
      });
      this.router.navigate(['/login']);
    } else {
      this.userService.updateUser(this.userId, this.updatedUser)
        .subscribe(updatedUser => {
         Swal.fire({
           icon: 'success',
           title: 'User Updated Successfully'
         })
         localStorage.removeItem('users');
         this.userService.isLoggedIn = false;
         localStorage['isLoggedIn'] = "false";
         this.router.navigate(['/login']);
        })
      }
    }
  
  deleteUser(){
    if(!this.userService.isLoggedIn){
      Swal.fire({
        icon : 'error',
        title : 'Login First'
      })
      this.router.navigate(['/login']);
    } else {
      this.userService.updateUser(this.userId, {status : 0})
        .subscribe(updatedUser => {
          Swal.fire({
            icon : 'success',
            title : 'User Deleted Successfully'
          })
          localStorage.removeItem('users');
          this.userService.isLoggedIn = false;
          localStorage['isLoggedIn'] = "false";
          this.router.navigate(['/login']);
        })
    }
  }
}

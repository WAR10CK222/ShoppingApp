import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../shared/order.service';
import { UserService } from '../shared/user.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { GroceryService } from '../shared/grocery.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user : any;
  userOrder : any;
  err : any;
  showDetail : Boolean = false;
  showPassword : Boolean = false;
  showUsers : Boolean = false;
  showGroceries : Boolean = false;
  showGroceryForm : Boolean = false;
  userId : string = "";
  allUsers : any;
  allGrocery : any;

  passwordForm: FormGroup;
  submitted = false;
  status : any;

  groceryForm: FormGroup;
  grocerysubmitted = false;
  grocerystatus : any;

  constructor(private userService : UserService, private router : Router, private orderService : OrderService, private formBuilder : FormBuilder, private groceryService : GroceryService) { }

  ngOnInit() {
    if(!this.userService.isLoggedIn === true){
      Swal.fire({
        icon: 'error',
        text: 'Login First'
      });
      this.router.navigate(['/login']);
    } else {
      this.user = JSON.parse(localStorage['users']);
      this.userId = this.user['_id'];
      console.log('From here ->');
      console.log(`${this.user._id}`);
      this.orderService.loadOrder(this.userId).subscribe(orders => {
        console.log(orders);
        this.userOrder = orders;
        //console.log(this.userOrder['foundOrders']);
      }, error => {
        this.err = error;
        console.log(this.err.message);
      });
      this.getAllUsers();
      this.getAllGroceries();

      this.passwordForm = this.formBuilder.group({
        oldPassword : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
        newPassword : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
        confirmPassword : ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), this.checkPasswords]]
      }, {
        validators: this.checkPasswords
      });

      this.groceryForm = this.formBuilder.group({
        name : ['', Validators.required],
        price : [null, [Validators.required, Validators.minLength(1)]],
        amount : [null, [Validators.required, Validators.minLength(1)]],
        img : ['', Validators.required]
      });
        
    }
  }
  get f() { return this.passwordForm.controls; }
  get g() { return this.groceryForm.controls; }

  onGrocerySubmit() {
    console.log(this.groceryForm.value);
    this.grocerysubmitted = true;
  
    if (this.groceryForm.invalid){
      return;
    }
  
    if (this.groceryForm.valid){
      console.log('Valid');
      this.groceryService.createGrocery(this.groceryForm.value)
        .subscribe(grocery => {
          Swal.fire({
            icon: 'success',
            title: 'Grocery Added Successfully'
          })
          .then(() => {
            location.reload();
          }) 
        }, error => {
          Swal.fire({
            icon: 'error',
            title: `Unknown Error : ${error}`
          });
        })
    }
  }

  checkPasswords(passwordForm: FormGroup) { // here we have the 'passwords' group
    let pass = passwordForm.value['newPassword'];
    let confirmPass = passwordForm.value['confirmPassword'];

    return pass === confirmPass ? null : { notSame: true }     
  }

  onSubmit() {
    console.log(this.passwordForm.value);
    this.submitted = true;

    if (this.passwordForm.invalid) {
      return;
    }

    if(this.passwordForm.valid) {
      this.userService.checkPassword(this.userId, this.passwordForm.value['oldPassword'])
        .subscribe(status => {
          this.status = status;
          console.log(this.status['status']);
          if(!this.status['status']){
            Swal.fire({
              icon : 'error',
              title : 'Incorrect Password'
            })
            // location.reload();
          } else {
            this.userService.updateUser(this.userId, {password : this.passwordForm.value['newPassword']})
              .subscribe(updatedUser => {
                Swal.fire({
                  icon : 'success',
                  title : 'Changed Password Successfully'
                })
                localStorage.removeItem('users');
                this.userService.isLoggedIn = false;
                localStorage['isLoggedIn'] = "false";
                this.router.navigate(['/login']);
              })
          }
        })
    }
  }


  inactive(list : any){
    Swal.fire({
      icon: 'warning',
      title : 'Inactive User ?',
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: "No"
    }).then(result => {
      if(result.isConfirmed) {
        this.userService.updateUser(list['_id'], {status : 0})
        .subscribe(updatedUser => {
          Swal.fire({
            icon : 'success',
            title : 'User Set as Inactive Successfully'
          }).then(() => {
            location.reload();
          })
        })
      } else if(result.isDenied) {
        Swal.fire({
          icon : 'info',
          title : 'No changes applied'
        })
      }
    })
  }

  

  active(list : any){
    Swal.fire({
      icon: 'warning',
      title : 'Set User Active ?',
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: "No"
    }).then(result => {
      if(result.isConfirmed) {
        this.userService.updateUser(list['_id'], {status : 1})
        .subscribe(updatedUser => {
          Swal.fire({
            icon : 'success',
            title : 'User Set as Active Successfully'
          }).then(() => {
            location.reload();
          })
        })
      } else if(result.isDenied) {
        Swal.fire({
          icon : 'info',
          title : 'No changes applied'
        })
      }
    })
  }

  getAllUsers(){
    this.userService.getUsers()
      .subscribe(lists => {
        this.allUsers = lists;
      }, error => {
        console.log(error);
      })
  }

  getAllGroceries(){
    this.groceryService.getGrocery()
      .subscribe(groceries => {
        this.allGrocery = groceries;
      }, error => {
        console.log(error);
      })
  }
}

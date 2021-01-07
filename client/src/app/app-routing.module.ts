import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroceryComponent } from './grocery/grocery.component';
import { OrderComponent } from './order/order.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: 'login', component: UserComponent},
  {path: 'cart', component: OrderComponent},
  {path: 'grocery', component: GroceryComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '', redirectTo: '/grocery', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

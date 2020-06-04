import { AddDealComponent } from './components/add-deal/add-deal.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'app-login', component: LoginComponent },
  { path: 'app-home', component: AddUserComponent },
  { path: 'add-deal', component: AddDealComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

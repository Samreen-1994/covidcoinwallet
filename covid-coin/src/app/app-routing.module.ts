import { LeverageComponent } from './components/leverage/leverage.component';
import { DealCenterComponent } from './components/deal-center/deal-center.component';
import { AddDealComponent } from './components/add-deal/add-deal.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ShowUserComponent } from './components/show-user/show-user.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'app-login', component: LoginComponent },
  { path: 'app-home', component: AddUserComponent },
  { path: 'add-deal', component: AddDealComponent },
  { path: 'deal-center', component: DealCenterComponent },
  { path: 'app-leverage', component: LeverageComponent },
  { path: 'app-leverage', component: LeverageComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'show-user', component: ShowUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

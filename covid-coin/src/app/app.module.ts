import { ShowUserComponent } from './components/show-user/show-user.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddDealComponent } from './components/add-deal/add-deal.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DealCenterComponent } from './components/deal-center/deal-center.component';
import { LeverageComponent } from './components/leverage/leverage.component';
import { AddSupervisorComponent } from './components/add-supervisor/add-supervisor.component';
import { ShowSupervisorsComponent } from './components/show-supervisors/show-supervisors.component';

@NgModule({
  declarations: [
    LoginComponent,
    NavbarComponent,
    AddUserComponent,
    AppComponent,
    AddDealComponent,
    DealCenterComponent,
    LeverageComponent,
    ShowUserComponent,
    AddSupervisorComponent,
    ShowSupervisorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        timeOut: 10000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

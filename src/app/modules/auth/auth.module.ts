import { RegisterUserComponent } from './components/register-user/register-user.component';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { authRoutingModule } from './auth-routing.module';
import { NzProgressModule } from 'ng-zorro-antd/progress';


//modulo del componente auth
@NgModule({
  declarations: [
    LoginComponent,
    RegisterUserComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    authRoutingModule,
    NzProgressModule,
    SharedModule
  ]
})
export class AuthModule { }

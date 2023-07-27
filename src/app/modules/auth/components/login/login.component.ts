import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import $ from 'jquery';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticatorService } from 'src/app/modules/auth/services/authenticator.service';
import {
  Auth,
  UserLoginToken,
} from 'src/app/modules/auth/interfaces/auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticatorService],
})
export class LoginComponent implements OnInit {
  //variables de login
  loginForm!: FormGroup;
  emailControl!: FormControl;
  passwordControl!: FormControl;
  bShow: boolean = false;
  errorMessage: string = '';

  userLogin: UserLoginToken = {
    email: '',
    password: '',
  };
  constructor(
    private authenticatorService: AuthenticatorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //comprueba si ya esta logado, para en caso de estarlo devolverlo a la pagina principal en este caso user
    if (
      this.userLogged()
    ) {
      this.router.navigate(['/users']);
    }
    //creacion del formulario
    this.emailControl = new FormControl('', [
    ]);
    this.passwordControl = new FormControl('', Validators.required);

    this.loginForm = new FormGroup({
      emailControl: this.emailControl,
      passwordControl: this.passwordControl,
    });

    if (localStorage.getItem('EMAIL')) {
      this.loginForm.controls['emailControl'].setValue(
        localStorage.getItem('EMAIL')
      );
    }
  }
  get f() {
    return this.loginForm.controls;
  }

  onLogin() {
    //metodo de login donde se guardan los datos del formulario y se envia al metodo del back
    this.userLogin.email = this.emailControl.value;
    this.userLogin.password = this.passwordControl.value;
    this.authenticatorService.login(this.userLogin.email, this.userLogin.password).subscribe({
      next: (data: Auth) => {
        localStorage.setItem('EMAIL', this.emailControl.value);
        this.authenticatorService.setAuth(data);
        this.router.navigate(['/users']);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'Usuario/Password incorrecto';
        this.authenticatorService.borrarToken();

        if (error.status === 401) {
          this.errorMessage = 'Usuario/Password incorrecto';
        }
        if (error.status === 500) {
          this.errorMessage = 'El servidor no está disponible';
        }
      },
      complete: () => {
        this.errorMessage = 'Usuario/Password incorrecto';
      },
    });
  }
  userLogged() {
  
    return this.authenticatorService.userValidator();
  }
  show() {
    if (this.bShow == false) {
      $('#password').attr('type', 'text');
      this.bShow = !this.bShow;
    } else {
      $('#password').attr('type', 'password');
      this.bShow = !this.bShow;
    }
  }
}

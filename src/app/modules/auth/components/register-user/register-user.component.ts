import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import $ from 'jquery';
import { AuthenticatorService } from '../../services/authenticator.service';
import { User } from 'src/app/modules/user/interfaces/user.interface';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit {
  //variables del componente y para el formulario
  activationForm!: FormGroup;
  passwordControl!: FormControl;
  nameControl!: FormControl;
  lastnameControl!: FormControl;
  emailControl!: FormControl;
  dniControl!: FormControl;
  passwordControlVal!: FormControl;
  bShow: boolean = false;
  bShowVal: boolean = false;

  constructor(
    private router: Router,
    private AuthService: AuthenticatorService
  ) {}

  ngOnInit(): void {
    //borrado de la sesion y se establecen los formcontrol
    this.AuthService.borrarToken();
    this.nameControl = new FormControl('', [
      Validators.required
    ]);
    this.lastnameControl = new FormControl('', [
      Validators.required
    ]);
    this.dniControl = new FormControl('', [
      Validators.required
    ]);
    this.emailControl = new FormControl('', [
      Validators.email
    ]);
    this.passwordControl = new FormControl('', [
      Validators.required,
      Validators.pattern(
        '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
      ),
    ]);
    this.passwordControlVal = new FormControl('', [
      Validators.required,
      Validators.pattern(
        '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
      ),
    ]);
   
    //y se enlaza al formgroup
    this.activationForm = new FormGroup({
      passwordControl: this.passwordControl,
      passwordControlVal: this.passwordControlVal,
      nameControl: this.nameControl,
      dniControl: this.dniControl,
      lastnameControl: this.lastnameControl,
      emailControl: this.emailControl
    });

   
  }
  get f() {
    return this.activationForm.controls;
  }
//metodos para el cambio de estado de la contraseña
  show() {
    if (this.bShow == false) {
      $('#password').attr('type', 'text');
      this.bShow = !this.bShow;
    } else {
      $('#password').attr('type', 'password');
      this.bShow = !this.bShow;
    }
  }
  showVal() {
    if (this.bShowVal == false) {
      $('#passwordval').attr('type', 'text');
      this.bShowVal = !this.bShowVal;
    } else {
      $('#passwordval').attr('type', 'password');
      this.bShowVal = !this.bShowVal;
    }
  }
  //comprobacion de la igualdad de las contraseñas 
  esValidado() {
    if (this.passwordControl.value != '') {
      if (
        this.passwordControl.value === this.passwordControlVal.value
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
  return(){
    this.router.navigate(['/login']);
  }
  register(){
    //metodo de registro de usuario donde se guarda en una interfaz y se pasa al metodo del back
   const user: User = {
      dni: this.activationForm.get('dniControl')?.value,
      name: this.activationForm.get('nameControl')?.value,
      last_name:this.activationForm.get('lastnameControl')?.value,
      mail:this.activationForm.get('emailControl')?.value,
      password: this.activationForm.get('passwordControl')?.value
    };
    this.AuthService.register(user).subscribe({
      next: (data: User) => {
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {

      },
      complete: () => {
      },
    });
  }
}

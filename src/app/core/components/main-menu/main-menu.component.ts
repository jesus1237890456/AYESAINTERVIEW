import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from 'src/app/modules/auth/services/authenticator.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {
  email: string = '';
  user_id: number = 0;
  bureau_id: number = 0;
  bureau_name: string = '';
  rol_id: number = 0;
  name_user: string = '';
  text: string = '';
  text_last: string = '';
  color: string = '';
  gap = 4;

  constructor(
    private AuthService: AuthenticatorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.text =
      localStorage.getItem('name_user')!.substring(0, 1).toUpperCase()
 
    this.name_user =
      localStorage.getItem('name_user')!.toUpperCase();
    this.bureau_name = localStorage.getItem('bureau_name')!.toUpperCase();
    this.user_id = parseInt(localStorage.getItem('user_id')!);
  }
  usuarioLogado() {
    if (
      this.AuthService.getToken() != '' &&
      this.AuthService.getToken() != null
    ) {
      this.email = localStorage.getItem('EMAIL')!;
      this.user_id = parseInt(localStorage.getItem('user_id')!);
      return true;
    } else {
      return false;
    }
  }
  cerrarSession() {
    this.AuthService.borrarToken();
    this.router.navigate(['/login']);
  }
}

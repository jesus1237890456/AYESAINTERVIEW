import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorService } from './modules/auth/services/authenticator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'afilia3';

  constructor(
    private router: Router,
    private authenticatorService: AuthenticatorService
  ) { }
  //variable que pasa al menu lateral para desplegar
  isCollapsed = false;
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  ngOnInit(): void {
    //si no esta logado lo manda al login
    if (
      !this.userLogged() &&
      !this.router.url.includes('/login')
    ) {
      this.router.navigate(['/login']);
    }
  }
  userLogged() {

    return this.authenticatorService.userValidator();
  }
}


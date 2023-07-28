import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  Auth,
} from 'src/app/modules/auth/interfaces/auth.interface';
import { User } from '../../user/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatorService {
  //variables del servicio de auth
  private Token: string = '';

  userLogged: Auth = {
    id: 0,
    name: '',
    empresa: '',
    userEmail: '',
    bureauName: '',
    accessToken: '',
  };

  private validator: boolean = false;
  constructor(private http: HttpClient, private router: Router) {}

  //comprobacion de sesion
  public userValidator(): boolean {
    if (this.getToken()) {
      this.validator = true;
    } else {
      this.validator = false;
    }
    return this.validator;
  }
  //metodo del login
  public login(name: string, password: string): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('content-type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    const URL = "http://localhost:3000/auth/login"
    return this.http.post<any>(`${URL}`, { dni: name, password:password },{ headers: headers });
  }
  public logout(id_usuario: number): Observable<any> {
    const URL = "http://localhost:3000/auth/logout"
    return this.http.post<any>(`${URL}`, { id_usuario });
  }
  //metodo del registro
  public register(user: User): Observable<User> {
    let headers = new HttpHeaders();
    headers.set('content-type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    const URL = "http://localhost:3000/auth/register"
    const body = user;
    return this.http.post<User>(URL, user);
  }



//estos tres son el seteo borrado y obtencion de datos como el token
  public setAuth(data: Auth): void {
    
    this.Token = data.accessToken;
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('name_user', data.name);
    localStorage.setItem('bureau_name', data.empresa);
    localStorage.setItem('id_usuario', data.id.toString());
  }


  public deleteToken() {
    this.Token = '';
    localStorage.setItem('token', this.Token);

  }
  public deleteData() {
    localStorage.setItem('name_user', '');
    localStorage.setItem('bureau_name', '');
    localStorage.setItem('id_usuario', '');
  }

  public getToken(): string {
    return localStorage.getItem('token')!;
  }
}
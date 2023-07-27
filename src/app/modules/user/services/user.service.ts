import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, Users, UserOne } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root',
})
export class UserService {
//variables del servicio de usuario
  private ENDPOINT: string = "http://localhost:3000/";
  private GETUSER: string = 'users/';

  constructor(private http: HttpClient) {}

  //metodo que muestra todos los usuarios
  public getUsers(
  ): Observable<Users> {
    const URL = this.ENDPOINT + this.GETUSER;

    return this.http.get<Users>(URL);
  }

  //metodo que muestra un usuario
  public getUser(userId:number
    ): Observable<UserOne> {
      const URL = this.ENDPOINT + this.GETUSER + userId;
  
      return this.http.get<UserOne>(URL);
    }
 
    //metodo que crea un usuario
  public createUser(dataUser: User): Observable<User> {
    const URL = this.ENDPOINT + this.GETUSER;
    const body = dataUser;

    return this.http.post<User>(URL, body);
  }

  //metodo que actualiza un usuario
  public updateUser(dataUser: User): Observable<User> {
    const URL = this.ENDPOINT + this.GETUSER  + dataUser.id;
    const body = dataUser;

    return this.http.put<User>(URL, body);
  }

  //metodo que borra un usuario
  public deleteUser(userId: number, id: number): Observable<User> {
    const URL = this.ENDPOINT + this.GETUSER + userId+"/"+id;
    const body = id;
    return this.http.delete<User>(URL);
  }
}

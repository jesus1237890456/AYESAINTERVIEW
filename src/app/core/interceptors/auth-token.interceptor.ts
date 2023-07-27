import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, finalize, Observable, of, throwError } from 'rxjs';
import {
  refreshToken,
} from '../../modules/auth/interfaces/auth.interface';
import { AuthenticatorService } from 'src/app/modules/auth/services/authenticator.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  //variable del token
  refreshToken: refreshToken = {
    accessToken: ''
    };

  constructor( private authenticatorService: AuthenticatorService,    private router: Router

  ) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    //interceptor que si esta en el login se queda sin comprobar token
    if (request.url.includes('login')) {
      return next.handle(request);
    } else {
      //y si no viene de login comprueba el token, si no es valido, cierra sesion y borra el localStorage
        this.refreshToken.accessToken = localStorage.getItem('token')!;
        const modRequest = request.clone({
          setHeaders: {
            authorization: `Bearer ${this.refreshToken.accessToken}`,
          },
        });

        return next.handle(modRequest).pipe(
          catchError((err: any) => {

            if (err.status === 401) {
              this.authenticatorService.deleteData();
              this.authenticatorService.deleteToken();
              this.router.navigate(['/login']);
            }

            return throwError(() => new HttpErrorResponse(err));
          }),
          finalize(() => {})
        );
      
    }
  }
}

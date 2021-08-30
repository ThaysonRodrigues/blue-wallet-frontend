import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
              private http: HttpClient,
              private tokenService: TokenService
            ) {}

  autenticarUsuario(email: string, senha: string): Observable<any> {
    return this.http
    .post(
      environment.autenticarUsuario, {email, senha}, {observe: 'response'}
    ).pipe(tap(res => {
      this.tokenService.setToken(res.body.token);
    }));
  }
}
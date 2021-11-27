import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    return this.http
    .post(
      environment.autenticarUsuario, {email, senha}, {headers: headers}, {observe: 'response'}
    ).pipe(tap(res => {
      this.tokenService.setToken(res.body.token);
    }));
  }
}
import { UsuarioDTO } from './interface/response/UsuarioDTO';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CadastrarUsuarioRequest } from './interface/request/cadastrarUsuarioRequest';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable
(
  { providedIn: 'root' }
)

export class CadastroService {

  constructor(private http: HttpClient, private tokenService: TokenService){}

  cadastrarUsuario(cadastroRequest: CadastrarUsuarioRequest): Observable<any> {
    return this.http.post<CadastrarUsuarioRequest>(environment.cadastrarNovoUsuario, cadastroRequest);
  }

  verificarCadastro(cadastroRequest: CadastrarUsuarioRequest): Observable<any> {
      return this.http.post(environment.verificarConta, cadastroRequest, {observe: 'response'})
      .pipe(tap (res => {
          this.tokenService.setToken(res.body.token);
      }));
  }

  getDadosCadastrais(token: string): Observable<UsuarioDTO> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<UsuarioDTO>(environment.consultarUserName, {headers: headers});
  }

  atualizarDadosCadastrais(dadosUsuario: UsuarioDTO, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(environment.atualizarDadosCadastrais, dadosUsuario, {headers: headers});
  }

  enviarCodigoRecuperarSenha(email: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(environment.enviarCodigoRecuperarSenha + `${email}`, {headers: headers});
  }
}

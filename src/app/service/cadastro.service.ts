import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { CadastrarUsuarioRequest } from './interface/request/cadastrarUsuarioRequest';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable
(
    { providedIn: 'root' }
)

export class CadastroService {

    constructor(private http: HttpClient,
                private tokenService: TokenService
        ) 
        {}

    cadastrarUsuario(cadastroRequest: CadastrarUsuarioRequest): Observable<any> {
        return this.http.post<CadastrarUsuarioRequest>(environment.cadastrarNovoUsuario, cadastroRequest);
    }

    verificarCadastro(cadastroRequest: CadastrarUsuarioRequest): Observable<any> {
        return this.http.post(environment.verificarConta, cadastroRequest, {observe: 'response'})
        .pipe(tap (res => {
            this.tokenService.setToken(res.body.token);
        }));
    }
}
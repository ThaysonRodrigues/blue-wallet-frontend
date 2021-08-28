import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { CadastrarUsuarioRequest } from './interface/request/cadastrarUsuarioRequest';
import { environment } from 'src/environments/environment';

@Injectable
(
    { providedIn: 'root' }
)

export class CadastroService {

    constructor(private http: HttpClient) {}

    cadastrarUsuario(cadastroRequest: CadastrarUsuarioRequest): Observable<any> {
        console.log('cadastrando novo usuario');
        return this.http.post<CadastrarUsuarioRequest>(environment.cadastrarNovoUsuario, cadastroRequest);
    }

    verificarCadastro(cadastroRequest: CadastrarUsuarioRequest): Observable<any> {
        return this.http.post(environment.verificarConta, cadastroRequest, {observe: 'response'});
    }
}
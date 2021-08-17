import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CadastrarUsuarioRequest } from './interface/request/cadastrarUsuarioRequest';

@Injectable(
    { providedIn: 'root' }
  )
export class CadastroService {

    public cadastroRequest: CadastrarUsuarioRequest;

    constructor(private http: HttpClient) {
        this.cadastroRequest = new CadastrarUsuarioRequest();
    }

    cadastrarUsuario(): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                'key': 'x-api-key',
                'value': 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',

            })
        };
        
        return this.http.post<CadastrarUsuarioRequest>("/api/conta/cadastrar", this.cadastroRequest, httpOptions);
    }
}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LancamentoReceitaRequest } from './interface/request/LancamentoReceitaRequest';
import { ReceitaDTO } from './interface/response/receitaDTO';

@Injectable({
  providedIn: 'root'
})
export class LancamentoReceitaService {

  constructor(private http: HttpClient) { }

  gravarLancamentoReceita(receita: LancamentoReceitaRequest, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

   return this.http.post(environment.gravarLancamentoReceita, receita, { headers: headers });
  }

  atualizaLancamentoReceita(receita: LancamentoReceitaRequest, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

   return this.http.put(environment.editarLancamentoReceita, receita, { headers: headers });
  }

  listarLancamentoReceita(data: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ReceitaDTO[]>(environment.listarLancamentoReceita + "/" + data + "?page=0", {headers: headers});
  }

  apagarReceita(idReceita: number, token: string):  Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(environment.apagarReceita + `/${idReceita}`, {headers: headers});
  }
}
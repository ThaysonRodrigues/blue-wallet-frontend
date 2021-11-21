import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DespesaDTO } from './interface/response/despesaDTO';
import { environment } from 'src/environments/environment';
import { LancamentoDespesaRequest } from './interface/request/LancamentoDespesaRequest';

@Injectable({
  providedIn: 'root'
})
export class LancamentoDespesaService {

  constructor(private http: HttpClient) {}

  listarLancamentoDespesa(data: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<DespesaDTO[]>(environment.listarLancamentoDespesa + "/" + data + "?page=0", {headers: headers});
  }

  gravarLancamentoDespesa(receita: LancamentoDespesaRequest, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

   return this.http.post(environment.gravarLancamentoDespesa, receita, { headers: headers });
  }

  atualizaLancamentoDespesa(despesa: LancamentoDespesaRequest, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

   return this.http.put(environment.editarLancamentoDespesa, despesa, { headers: headers });
  }

  apagarDespesa(idReceita: number, token: string):  Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(environment.apagarDespesa + `/${idReceita}`, {headers: headers});
  }
}

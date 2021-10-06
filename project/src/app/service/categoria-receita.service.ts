import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoriaResponseDTO } from './interface/response/categoriaResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class CategoriaReceitaService {

  constructor(private http: HttpClient) { }

  listCategoriaReceita(token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<CategoriaResponseDTO[]>(environment.pesquisarCategoriaReceita, { headers: headers});
  }
}

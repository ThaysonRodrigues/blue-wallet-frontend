import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ControleEstadoReceitasService {

  constructor() {}

  private atualizaTable = false;

  setAtualizaTable(atualizaTable: boolean) {
    this.atualizaTable = atualizaTable;
  }

  getAtualizaTable() {
    return this.atualizaTable;
  }
}

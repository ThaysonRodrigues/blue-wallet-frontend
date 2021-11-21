import { Injectable } from '@angular/core';
import { Acao } from 'src/environments/acao';

@Injectable({
  providedIn: 'root'
})
export class ControleEstadoDespesasService {

  constructor() {}

  private atualizaTable = false;
  private despesa: any;
  private acao: Acao;

  setAtualizaTable(atualizaTable: boolean) {
    this.atualizaTable = atualizaTable;
  }

  getAtualizaTable() {
    return this.atualizaTable;
  }

  setDespesa(despesa) {
    this.despesa = despesa
  }

  getDespesa() {
    return this.despesa;
  }

  setAcao(acao: Acao) {
    this.acao = acao;
  }

  getAcao() {
    return this.acao;
  }
}

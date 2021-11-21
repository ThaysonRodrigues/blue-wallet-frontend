import { Injectable } from '@angular/core';
import { Acao } from 'src/environments/acao';

@Injectable({
  providedIn: 'root'
})

export class ControleEstadoReceitasService {

  constructor() {}

  private atualizaTable = false;
  private receita: any;
  private acao: Acao;

  setAtualizaTable(atualizaTable: boolean) {
    this.atualizaTable = atualizaTable;
  }

  getAtualizaTable() {
    return this.atualizaTable;
  }

  setReceita(receita) {
    this.receita = receita
  }

  getReceita() {
    return this.receita;
  }

  setAcao(acao: Acao) {
    this.acao = acao;
  }

  getAcao() {
    return this.acao;
  }
}

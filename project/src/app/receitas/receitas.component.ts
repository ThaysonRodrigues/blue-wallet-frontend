import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogReceitaComponent } from '../dialog-receita/dialog-receita.component';
import { ReceitaDTO } from '../service/interface/response/receitaDTO';
import { LancamentoReceitaService } from '../service/lancamento-receita.service';
import { TokenService } from '../service/token.service'
import { FormControl, FormGroup } from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';

import * as moment from 'moment';
import { MY_FORMATS } from './myFormats';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})

export class ReceitasComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private lancamentoReceitaService: LancamentoReceitaService,
              private tokenService: TokenService,
              private toastr: ToastrService,
              ) { }
  
  listLancamentoReceita: ReceitaDTO[];   
  
  displayedColumns: string [] = ['descricao', 'valor', 'categoria', 'numParcelas', 'dataLancamento', 'situacao'];
  
  dataPesquisaReceita = new FormControl(moment());
  
  public pesquisaReceitaForm: FormGroup;

  DATE_FORMAT = "YYYY-MM";

  public loading = false;
  
  ngOnInit(): void {
    this.listarLancamentoReceitas();
  }

  pesquisarLancamentoReceita(event) {
    this.listarLancamentoReceitas();
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.dataPesquisaReceita.value;
    ctrlValue.year(normalizedYear.year());
    this.dataPesquisaReceita.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.dataPesquisaReceita.value;
    ctrlValue.month(normalizedMonth.month());
    this.dataPesquisaReceita.setValue(ctrlValue);
    datepicker.close();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogReceitaComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataPesquisaReceita = new FormControl(moment());
      this.listarLancamentoReceitas();
    });
  }

  listarLancamentoReceitas() {
    this.loading = true;
    this.listLancamentoReceita = null;
    var dataPesquisa = moment(this.dataPesquisaReceita.value).format(this.DATE_FORMAT);

    this.lancamentoReceitaService.listarLancamentoReceita(dataPesquisa, this.tokenService.getToken())
      .subscribe((res) => {
        this.loading = false;
        this.listLancamentoReceita = res;
      }, err => {
        this.loading = false;
        this.toastr.error('Ocorreu um erro ao buscar as receitas, tente novamente mais tarde', '');
      });
  }
}
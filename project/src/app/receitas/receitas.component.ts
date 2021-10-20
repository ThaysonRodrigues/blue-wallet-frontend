import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogReceitaComponent } from '../dialog-receita/dialog-receita.component';
import { ReceitaDTO } from '../service/interface/response/receitaDTO';
import { LancamentoReceitaService } from '../service/lancamento-receita.service';
import { TokenService } from '../service/token.service'
import { FormControl } from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { Moment } from 'moment';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';

import * as moment from 'moment';
import { MY_FORMATS } from './myFormats';

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
              private tokenService: TokenService
              ) { }
  
  listLancamentoReceita: ReceitaDTO[];   
  displayedColumns: string [] = ['descricao', 'valor', 'categoria', 'numParcelas', 'dataLancamento', 'situacao'];
  dataPesquisaReceita = new FormControl(moment());

  cont: number = 0;

  ngOnInit(): void {
    this.lancamentoReceitaService.listarLancamentoReceita('2021-09', this.tokenService.getToken())
      .subscribe((res) => {
        this.listLancamentoReceita = res;
        console.log(res);
      });
  }

  pesquisarLancamentoReceita(event) {
    this.cont++;

    if(this.cont === 2) {
      alert('agora ' + this.dataPesquisaReceita.value)
      this.cont = 0;
    }
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
      console.log('The dialog was closed');
    });
  }
}
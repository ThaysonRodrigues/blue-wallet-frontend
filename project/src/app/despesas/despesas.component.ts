import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReceitaDTO } from '../service/interface/response/receitaDTO';
import { TokenService } from '../service/token.service'
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';

import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { Acao } from 'src/environments/acao';
import { MY_FORMATS } from 'src/environments/myFormats';
import { LancamentoDespesaService } from '../service/lancamento-despesa.service';
import { DialogDespesaComponent } from '../dialog-despesa/dialog-despesa.component';
import { ControleEstadoDespesasService } from '../service/controle-estado-despesas.service';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class DespesasComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private lancamentoDespesaService: LancamentoDespesaService,
              private tokenService: TokenService,
              private toastr: ToastrService,
              private controleEstadoDespesa: ControleEstadoDespesasService
            ) {}

  displayedColumns: string [] = ['descricao', 'valor', 'categoria', 'numParcelas', 'dataPagamento', 'situacao', 'editar', 'apagar'];

  dataPesquisaReceita = new FormControl(moment());
  
  public pesquisaReceitaForm: FormGroup;

  DATE_FORMAT = "YYYY-MM";

  loading = false;

  length: number;

  dataSource: MatTableDataSource<ReceitaDTO>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.listarLancamentoDespesa(null);
  }

  pesquisarLancamentoDespesa(event) {
    this.listarLancamentoDespesa(null);
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
    const dialogRef = this.dialog.open(DialogDespesaComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {    
      if(this.controleEstadoDespesa.getAtualizaTable()) {
        this.controleEstadoDespesa.setAtualizaTable(false);
        console.log(this.controleEstadoDespesa.getAcao())
        this.listarLancamentoDespesa(this.controleEstadoDespesa.getAcao());
      }
    });
  }

  listarLancamentoDespesa(acao: Acao) {
    this.loading = true;
    var dataPesquisa = moment(this.dataPesquisaReceita.value).format(this.DATE_FORMAT);

    this.lancamentoDespesaService.listarLancamentoDespesa(dataPesquisa, this.tokenService.getToken())
      .subscribe((res) => {
        this.loading = false;

        if(res) {
          this.dataSource = new MatTableDataSource(res.content);    
          this.dataSource.paginator = this.paginator;    
          this.length = res.totalElements;
        } else {
          this.dataSource = new MatTableDataSource(null);    
        }
        
        this.notificarUsuario(acao);
      }, err => {
        this.loading = false;
        this.toastr.error('Ocorreu um erro ao buscar as receitas, tente novamente mais tarde', '');
      });
  }

  editarDespesa(despesa) {
    this.openDialog();
    this.controleEstadoDespesa.setDespesa(despesa);
  }

  notificarUsuario(acao: Acao) {
    if(acao == Acao.DELETAR) {
      this.toastr.success('Despesa deletada com sucesso!', '');
    } else if(acao == Acao.GRAVAR) {
      this.toastr.success('Despesa cadastrada com sucesso!');
    } else if(acao == Acao.EDITAR) {
      this.toastr.success('Despesa editada com sucesso!');
    }
  }

  apagarDespesa(idDespesa: number) {
    if(confirm("Tem certeza que deseja realizar a exclusão da despesa?")) {
      this.lancamentoDespesaService.apagarDespesa(idDespesa, this.tokenService.getToken())
      .subscribe((res) => {
        this.listarLancamentoDespesa(Acao.DELETAR);
      }, err => {
        this.toastr.error('Ocorreu um erro excluir receita, tente novamente mais tarde!', '');
      });
    }
  }
}
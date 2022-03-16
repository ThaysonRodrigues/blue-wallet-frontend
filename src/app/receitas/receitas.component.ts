import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogReceitaComponent } from '../dialog-receita/dialog-receita.component';
import { ReceitaDTO } from '../service/interface/response/receitaDTO';
import { LancamentoReceitaService } from '../service/lancamento-receita.service';
import { TokenService } from '../service/token.service'
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';

import * as moment from 'moment';
import { MY_FORMATS } from '../../environments/myFormats';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { ControleEstadoReceitasService } from '../service/controle-estado-receitas.service.service';
import { Acao } from 'src/environments/acao';
import { TableUtil } from '../util/TableUtil';

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
              private controleEstadoReceita: ControleEstadoReceitasService
              ) { }

  displayedColumns: string [] = ['descricao', 'valor', 'categoria', 'numParcelas', 'dataLancamento', 'situacao', 'editar', 'apagar'];

  dataPesquisaReceita = new FormControl(moment());

  public pesquisaReceitaForm: FormGroup;

  DATE_FORMAT = "YYYY-MM";

  loading = false;

  isDadosPesquisa = false;

  length: number;

  dataSource;

  public nomeUsuario: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('TABLE') table: ElementRef;
  ngOnInit(): void {
    this.nomeUsuario = this.tokenService.getNomeUsuario();
    this.listarLancamentoReceitas(null);
  }

  pesquisarLancamentoReceita(event) {
    this.listarLancamentoReceitas(null);
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
      if(this.controleEstadoReceita.getAtualizaTable()) {
        this.controleEstadoReceita.setAtualizaTable(false);
        this.listarLancamentoReceitas(this.controleEstadoReceita.getAcao());
      }
    });
  }

  listarLancamentoReceitas(acao: Acao) {
    this.loading = true;
    var dataPesquisa = moment(this.dataPesquisaReceita.value).format(this.DATE_FORMAT);

    this.lancamentoReceitaService.listarLancamentoReceita(dataPesquisa, this.tokenService.getToken())
      .subscribe((res) => {
        this.loading = false;

        if(res) {
          this.isDadosPesquisa = true;
          this.dataSource = new MatTableDataSource(res.content);
          this.dataSource.paginator = this.paginator;
          this.dataSource.table = this.table;
          this.length = res.totalElements;
        } else {
          this.isDadosPesquisa = false;
          this.dataSource = new MatTableDataSource(null);
        }

        this.notificarUsuario(acao);
      }, err => {
        this.loading = false;
        this.toastr.error('Ocorreu um erro ao buscar as receitas, tente novamente mais tarde', '');
      });
  }

  apagarReceita(idReceita: number) {
    if(confirm("Tem certeza que deseja realizar a exclusão da receita?")) {
      this.lancamentoReceitaService.apagarReceita(idReceita, this.tokenService.getToken())
      .subscribe((res) => {
        this.listarLancamentoReceitas(Acao.DELETAR);
      }, err => {
        this.toastr.error('Ocorreu um erro excluir receita, tente novamente mais tarde!', '');
      });
    }
  }

  editarReceita(receita) {
    this.openDialog();
    this.controleEstadoReceita.setReceita(receita);
  }

  notificarUsuario(acao: Acao) {
    if(acao == Acao.DELETAR) {
      this.toastr.success('Receita deletada com sucesso!', '');
    } else if(acao == Acao.GRAVAR) {
      this.toastr.success('Receita cadastrada com sucesso!');
    } else if(acao == Acao.EDITAR) {
      this.toastr.success('Receita editada com sucesso!');
    }
  }

  exportNormalTable() {
    TableUtil.exportTableToExcel("table-receitas","receitas");
  }
}

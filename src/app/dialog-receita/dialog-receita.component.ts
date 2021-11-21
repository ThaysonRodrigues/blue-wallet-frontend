import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Acao } from 'src/environments/acao';
import { CategoriaService } from '../service/categoria.service';
import { ControleEstadoReceitasService } from '../service/controle-estado-receitas.service.service';
import { LancamentoReceitaRequest } from '../service/interface/request/LancamentoReceitaRequest';
import { CategoriaResponseDTO } from '../service/interface/response/categoriaResponseDTO';
import { LancamentoReceitaService } from '../service/lancamento-receita.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-dialog-receita',
  templateUrl: './dialog-receita.component.html',
  styleUrls: ['./dialog-receita.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class DialogReceitaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogReceitaComponent>,
              private formBuilder: FormBuilder,
              private tokenService: TokenService,
              private categoriaService: CategoriaService,
              private dateAdapter: DateAdapter<Date>,
              private toastr: ToastrService,
              private lancamentoReceitaService: LancamentoReceitaService,
              private controleEstadoReceita: ControleEstadoReceitasService
              ) {
                this.dateAdapter.setLocale('pt-BR');
              }

  public receitaForm: FormGroup;

  listCategoriaReceita: CategoriaResponseDTO[];

  DATE_FORMAT = "MM/DD/YYYY";

  descricaoAcao: string;
  
  idReceita: number;

  ngOnInit(): void {
    this.populateFormOnInit();

    this.categoriaService.listCategoriaReceita(this.tokenService.getToken())
      .subscribe(res => this.listCategoriaReceita = res);

    if(this.controleEstadoReceita.getReceita() != null) {
      this.populaFormEdicao(this.controleEstadoReceita.getReceita());
      
      this.descricaoAcao = 'Editar Receita';
      this.idReceita = this.controleEstadoReceita.getReceita().idReceita;
      
      this.controleEstadoReceita.setReceita(null);      
    } else {
      this.descricaoAcao = 'Cadastrar Receita';
    }
  }

  gravarLancamentoReceita() {
    if(this.receitaForm.valid) {
      let receita = new LancamentoReceitaRequest();

      receita.descricao = this.receitaForm.get('descricao').value;
      receita.valor = this.receitaForm.get('valor').value;
      receita.dataLancamento = this.receitaForm.get('dataLancamento').value;
      receita.categoriaReceita = this.receitaForm.get('categoriaReceita').value;
      receita.numeroParcelas = this.receitaForm.get('quantidadeParcelas').value;
      receita.flgPagamentoEfetuado = this.receitaForm.get('despesaPaga').value;

      if(this.idReceita == null) { 
        //Grava nova receita
        this.lancamentoReceitaService.gravarLancamentoReceita(receita, this.tokenService.getToken())
          .subscribe(data => {
            this.fecharModal();
            
            this.controleEstadoReceita.setAtualizaTable(true);
            this.controleEstadoReceita.setAcao(Acao.GRAVAR);
          }, (error) => {
            this.toastr.error('Tente novamente mais tarde!', 'Erro');
          });
      } else { 
        // Atualiza receita
        receita.idReceita = this.idReceita;

        this.lancamentoReceitaService.atualizaLancamentoReceita(receita, this.tokenService.getToken())
          .subscribe(data => {
            this.fecharModal();
            this.controleEstadoReceita.setAtualizaTable(true);

            this.controleEstadoReceita.setAcao(Acao.EDITAR);
          }, (error) => {
            this.toastr.error('Tente novamente mais tarde!', 'Erro');
          });
      }
    } else {
      this.toastr.error('Por favor, preencha todos os campos obrigatórios', 'Erro');
    }
  }

  populateFormOnInit() {
    this.receitaForm = this.formBuilder.group({
      descricao: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.required]),
      dataLancamento: new FormControl(Date(), [Validators.required]),
      categoriaReceita: new FormControl('', [Validators.required]),
      quantidadeParcelas: new FormControl(1, [Validators.required]),
      despesaPaga: true,
    });
  }

  fecharModal(): void {
    this.dialogRef.close();
  }

  populaFormEdicao(receita) {  
    this.receitaForm.get('descricao').setValue(receita.descricao);
    this.receitaForm.get('valor').setValue(receita.valor);
    this.receitaForm.get('dataLancamento').setValue(new Date(moment(receita.dataLancamento)
      .format(this.DATE_FORMAT)));
    this.receitaForm.get('quantidadeParcelas').setValue(receita.numeroParcelas);
    this.receitaForm.get('despesaPaga').setValue(receita.flgPagamentoEfetuado);
    this.receitaForm.get('categoriaReceita').setValue(receita.categoriaReceita);

    this.receitaForm.controls['quantidadeParcelas'].disable();
  }
}

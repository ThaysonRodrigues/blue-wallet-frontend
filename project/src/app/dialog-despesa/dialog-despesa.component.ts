import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Acao } from 'src/environments/acao';
import { CategoriaService } from '../service/categoria.service';
import { ControleEstadoDespesasService } from '../service/controle-estado-despesas.service';
import { LancamentoDespesaRequest } from '../service/interface/request/LancamentoDespesaRequest';
import { CategoriaResponseDTO } from '../service/interface/response/categoriaResponseDTO';
import { LancamentoDespesaService } from '../service/lancamento-despesa.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-dialog-despesa',
  templateUrl: './dialog-despesa.component.html',
  styleUrls: ['./dialog-despesa.component.css']
})
export class DialogDespesaComponent implements OnInit {

  constructor
  (
    public dialogRef: MatDialogRef<DialogDespesaComponent>,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private categoriaService: CategoriaService,
    private dateAdapter: DateAdapter<Date>,
    private toastr: ToastrService,
    private lancamentoDespesaService: LancamentoDespesaService,
    private controleEstadoDespesa: ControleEstadoDespesasService
    ) { 
      this.dateAdapter.setLocale('pt-BR');
    }

  public despesaForm: FormGroup;

  listCategoriaDespesa: CategoriaResponseDTO[];

  DATE_FORMAT = "MM/DD/YYYY";

  descricaoAcao: string;
  
  idDespesa: number;

  ngOnInit(): void {
    this.populateFormOnInit();

    this.categoriaService.listCategoriaDespesa(this.tokenService.getToken())
      .subscribe(res => this.listCategoriaDespesa = res);

      if(this.controleEstadoDespesa.getDespesa() != null) {
        console.log(this.controleEstadoDespesa.getDespesa())
        this.populaFormEdicao(this.controleEstadoDespesa.getDespesa());
        
        this.descricaoAcao = 'Editar Despesa';
        this.idDespesa = this.controleEstadoDespesa.getDespesa().idDespesa;
        
        this.controleEstadoDespesa.setDespesa(null);      
      } else {
        this.descricaoAcao = 'Cadastrar Despesa';
      }
  }

  populateFormOnInit() {
    this.despesaForm = this.formBuilder.group({
      descricao: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.required]),
      dataPagamento: new FormControl(Date(), [Validators.required]),
      categoriaDespesa: new FormControl('', [Validators.required]),
      quantidadeParcelas: new FormControl(1, [Validators.required]),
      despesaPaga: true,
    });
  }

  fecharModal(): void {
    this.dialogRef.close();
  }

  gravarLancamentoDespesa() {
    if(this.despesaForm.valid) {
      let despesa = new LancamentoDespesaRequest();

      despesa.descricao = this.despesaForm.get('descricao').value;
      despesa.valor = this.despesaForm.get('valor').value;
      despesa.dataPagamento = this.despesaForm.get('dataPagamento').value;
      despesa.categoriaDespesa = this.despesaForm.get('categoriaDespesa').value;
      despesa.numeroParcelas = this.despesaForm.get('quantidadeParcelas').value;
      despesa.flgPagamentoEfetuado = this.despesaForm.get('despesaPaga').value;

      if(this.idDespesa == null) { 
        //Grava nova despesa
        this.lancamentoDespesaService.gravarLancamentoDespesa(despesa, this.tokenService.getToken())
          .subscribe(data => {
            this.fecharModal();
            
            this.controleEstadoDespesa.setAtualizaTable(true);
            this.controleEstadoDespesa.setAcao(Acao.GRAVAR);
          }, (error) => {
            this.toastr.error('Tente novamente mais tarde!', 'Erro');
          });
      } else { 
        // Atualiza despesa
        despesa.idDespesa = this.idDespesa;

        this.lancamentoDespesaService.atualizaLancamentoDespesa(despesa, this.tokenService.getToken())
          .subscribe(data => {
            this.fecharModal();

            this.controleEstadoDespesa.setAtualizaTable(true);
            this.controleEstadoDespesa.setAcao(Acao.EDITAR);
          }, (error) => {
            this.toastr.error('Tente novamente mais tarde!', 'Erro');
          });
      }
    } else {
      this.toastr.error('Por favor, preencha todos os campos obrigatórios', 'Erro');
    }
  }

  populaFormEdicao(despesa) {  
    this.despesaForm.get('descricao').setValue(despesa.descricao);
    this.despesaForm.get('valor').setValue(despesa.valor);
    this.despesaForm.get('dataPagamento').setValue(new Date(moment(despesa.dataLancamento)
      .format(this.DATE_FORMAT)));
    this.despesaForm.get('quantidadeParcelas').setValue(despesa.numeroParcelas);
    this.despesaForm.get('despesaPaga').setValue(despesa.flgPagamentoEfetuado);
    this.despesaForm.get('categoriaDespesa').setValue(despesa.categoriaDespesa);

    this.despesaForm.controls['quantidadeParcelas'].disable();
  }
}

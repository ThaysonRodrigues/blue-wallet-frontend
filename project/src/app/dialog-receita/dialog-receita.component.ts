import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoriaReceitaService } from '../service/categoria-receita.service';
import { LancamentoReceitaRequest } from '../service/interface/request/LancamentoReceitaRequest';
import { CategoriaResponseDTO } from '../service/interface/response/categoriaResponseDTO';
import { LancamentoReceitaService } from '../service/lancamento-receita.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-dialog-receita',
  templateUrl: './dialog-receita.component.html',
  styleUrls: ['./dialog-receita.component.css']
})
export class DialogReceitaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogReceitaComponent>,
              private formBuilder: FormBuilder,
              private tokenService: TokenService,
              private categoriaReceitaService: CategoriaReceitaService,
              private dateAdapter: DateAdapter<Date>,
              private toastr: ToastrService,
              private lancamentoReceitaService: LancamentoReceitaService
              ) {
                this.dateAdapter.setLocale('pt-BR');
              }

  public receitaForm: FormGroup;

  listCategoriaReceita: CategoriaResponseDTO[];
  
  ngOnInit(): void {
    this.populateFormOnInit();

    this.categoriaReceitaService.listCategoriaReceita(this.tokenService.getToken())
      .subscribe(res => this.listCategoriaReceita = res);
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

      this.lancamentoReceitaService.gravarLancamentoReceita(receita, this.tokenService.getToken())
        .subscribe(data => {
          this.fecharModal();
          this.toastr.success('Receita cadastrada com sucesso!');
        }, (error) => {
          this.toastr.error('Tente novamente mais tarde!', 'Erro');
        });
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
}

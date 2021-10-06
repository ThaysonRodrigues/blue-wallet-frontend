import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoriaReceitaService } from '../service/categoria-receita.service';
import { CategoriaResponseDTO } from '../service/interface/response/categoriaResponseDTO';
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
              private dateAdapter: DateAdapter<Date>) {
                this.dateAdapter.setLocale('pt-BR');
              }

  public receitaForm: FormGroup;

  listCategoriaReceita: CategoriaResponseDTO[];
  
  ngOnInit(): void {
    this.populateFormOnInit();

    this.categoriaReceitaService.listCategoriaReceita(this.tokenService.getToken())
      .subscribe(res => this.listCategoriaReceita = res);

    console.log(this.listCategoriaReceita);
  }

  populateFormOnInit() {
    this.receitaForm = this.formBuilder.group({
      despesaPaga: true,
      quantidadeParcelas: new FormControl(1, [Validators.required]),
      valor: new FormControl('', [Validators.required])
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}

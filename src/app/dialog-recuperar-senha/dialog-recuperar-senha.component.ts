import { CadastroService } from './../service/cadastro.service';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { AtualizarSenhaRequest } from '../service/interface/request/atualizarSenhaRequest';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-recuperar-senha',
  templateUrl: './dialog-recuperar-senha.component.html',
  styleUrls: ['./dialog-recuperar-senha.component.css']
})

export class DialogRecuperarSenhaComponent implements OnInit {

  public enviarEmailForm: FormGroup;
  public verificarCodigoVerificacaoForm: FormGroup;
  public confirmarSenhaForm: FormGroup;

  public emailEnviado: Boolean = false;
  public codigoVerificado: Boolean = false;
  public senhaAtualizada: Boolean = false;

  private email: string;
  private codigo: string;

  constructor(
              public dialogRef: MatDialogRef<DialogRecuperarSenhaComponent>,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private cadastroService: CadastroService
            ) {}

  ngOnInit(): void {
    this.populateFormOnInit();
  }

  populateFormOnInit() {
    this.enviarEmailForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required])
    });

    this.verificarCodigoVerificacaoForm = this.formBuilder.group({
      codigo: new FormControl('', [Validators.required])
    })

    this.confirmarSenhaForm = this.formBuilder.group({
      senha: new FormControl('', [Validators.required]),
      confirmacaoSenha: new FormControl('', [Validators.required])
    })
  }

  public recuperarSenha() {
    if(!this.emailEnviado) {
      this.enviarEmail();
    } else if (!this.codigoVerificado) {
      this.validarCodigoRecuperacaoSenha();
    } else if(!this.senhaAtualizada) {
      this.atualizarSenha();
    }
  }

  private atualizarSenha() {
    if(this.confirmarSenhaForm.valid) {
      let senha = this.confirmarSenhaForm.get('senha').value;
      let confirmacaoSenha = this.confirmarSenhaForm.get('confirmacaoSenha').value;

      if (senha != confirmacaoSenha) {
        this.toastr.error('Senhas Inválidas', 'Erro');
      } else {
        let atualizarSenha = new AtualizarSenhaRequest();
        atualizarSenha.codigo = new Number(this.codigo);
        atualizarSenha.email = this.email;
        atualizarSenha.senha = senha;

        this.cadastroService.atualizarSenha(atualizarSenha).subscribe((res) => {
          this.toastr.success('Senha atualizada!', 'Sucesso');
          this.senhaAtualizada = true;
          this.fecharModal();
        });
      }
    } else {
      this.toastr.error('Formulário inválido', 'Erro');
    }
  }

  private enviarEmail() {
    if(this.enviarEmailForm.valid) {
        this.email = this.enviarEmailForm.get('email').value;

        this.cadastroService.enviarCodigoRecuperarSenha(this.email).subscribe((res) => {
          this.emailEnviado = true;
        },
        (error: HttpErrorResponse) => {
          if(error.status == 404) {
            this.toastr.error('O e-mail informado não foi encontrado', 'Erro');
          } else {
            this.toastr.error('Tente novamente mais tarde', 'Erro');
          }
        });
    } else {
      this.toastr.error('Por favor, preencha todos os campos obrigatórios', 'Erro');
    }
  }

  private validarCodigoRecuperacaoSenha() {
    if(this.verificarCodigoVerificacaoForm.valid) {
      this.codigo = this.verificarCodigoVerificacaoForm.get('codigo').value;
      
      this.cadastroService.verificarCodigoRecuperacaoSenha(this.codigo, this.email).subscribe((res) => {
        this.codigoVerificado = true;
      },
      (error: HttpErrorResponse) => {
        if(error.status == 422) {
          this.toastr.error('Código de verificação inválido', 'Erro');
        } else {
          this.toastr.error('Tente novamente mais tarde', 'Erro');
        }
      });
    } else {
      this.toastr.error('Por favor, preencha o campo obrigatório', 'Erro');
    }
  }

  fecharModal(): void {
    this.dialogRef.close();
  }
}

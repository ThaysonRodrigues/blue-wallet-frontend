import { CadastroService } from './../service/cadastro.service';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dialog-recuperar-senha',
  templateUrl: './dialog-recuperar-senha.component.html',
  styleUrls: ['./dialog-recuperar-senha.component.css']
})

export class DialogRecuperarSenhaComponent implements OnInit {

  public enviarEmailForm: FormGroup;
  public verificarCodigoVerificacaoForm: FormGroup;
  public emailEnviado: Boolean = false;

  constructor(
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
  }

  recuperarSenha() {
    if(!this.emailEnviado) {
      this.enviarEmail();
    } else {
      this.validarCodigoRecuperacaoSenha();
    }
  }

  private enviarEmail() {
    if(this.enviarEmailForm.valid) {
        let email = this.enviarEmailForm.get('email').value;

        this.cadastroService.enviarCodigoRecuperarSenha(email).subscribe((res) => {
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
      alert('aeeee')
    } else {
      alert('deu ruim')
    }
  }
}

import { UsuarioDTO } from './../service/interface/response/UsuarioDTO';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CadastroService } from '../service/cadastro.service';
import { TokenService } from '../service/token.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-dados-usuario',
  templateUrl: './dialog-dados-usuario.component.html',
  styleUrls: ['./dialog-dados-usuario.component.css']
})
export class DialogDadosUsuarioComponent implements OnInit {

  constructor(
    private tokenService: TokenService,
    private cadastroService: CadastroService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<DialogDadosUsuarioComponent>
    ) {}

  public dadosCadastraisForm: FormGroup;

  public maskTelefone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  ngOnInit(): void {
    this.populateFormOnInit();

    this.cadastroService.getDadosCadastrais(this.tokenService.getToken()).subscribe((res) => {
      this.dadosCadastraisForm.get('nome').setValue(res.nome);
      this.dadosCadastraisForm.get('celular').setValue(res.celular);
      this.dadosCadastraisForm.get('email').setValue(res.email);
      this.dadosCadastraisForm.get('dataNascimento').setValue(res.dataNascimento);
    });
  }

  populateFormOnInit() :void {
    this.dadosCadastraisForm = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      celular: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl('', [Validators.required]),
    });
  }

  atualizarDadosCadastrais() {
    if(this.dadosCadastraisForm.valid) {
      let dadosUsuario = new UsuarioDTO();

      dadosUsuario.nome = this.dadosCadastraisForm.get('nome').value;
      dadosUsuario.celular = this.dadosCadastraisForm.get('celular').value;
      dadosUsuario.dataNascimento = this.dadosCadastraisForm.get('dataNascimento').value;

      this.cadastroService.atualizarDadosCadastrais(dadosUsuario, this.tokenService.getToken())
        .subscribe((res) => {
          this.tokenService.setNomeUsuario(dadosUsuario.nome);
          this.toastr.success('Dados atualizados com sucesso');
        });

    } else {
      this.toastr.error('Por favor, preencha todos os campos obrigatórios', 'Erro');
    }
  }

  fecharModal(): void {
    this.dialogRef.close();
  }
}

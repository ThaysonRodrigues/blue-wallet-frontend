import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CadastroService } from '../service/cadastroService';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  public cadastroForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private cadastroService: CadastroService,
              public dialogRef: MatDialogRef<CadastroUsuarioComponent>) {}

  ngOnInit(): void {
    this.populateFromOnInit();
  }

  cadastrarUsuario() {
    let request = this.cadastroService.cadastroRequest;

    request.nome = this.cadastroForm.get('nome').value;
    request.dataNascimento = this.cadastroForm.get('data_nascimento').value;
    request.email = this.cadastroForm.get('email').value;
    request.celular = this.cadastroForm.get('celular').value;
    request.senha = this.cadastroForm.get('senha').value;

    this.cadastroService.cadastrarUsuario().subscribe(usuario => {}, err => {console.log(err)});
  }

  private populateFromOnInit() {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      telefone: ['', Validators.required],
      celular: ['', Validators.required],
      senha: ['', Validators.required],
      data_nascimento: ['', Validators.required]
    });
  }
}
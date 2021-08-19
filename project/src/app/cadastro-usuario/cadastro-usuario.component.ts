import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CadastroService } from '../service/cadastroService';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  public cadastroForm: FormGroup;

  showMsg: boolean = false;

  public maskTelefone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(private formBuilder: FormBuilder,
              private cadastroService: CadastroService,
              private dateAdapter: DateAdapter<Date>,
              private _snackBar: MatSnackBar) 
              {
                this.dateAdapter.setLocale('pt-BR');
              }

  ngOnInit(): void {
    this.populateFromOnInit();
  }

  cadastrarUsuario(): void {    
    if(this.cadastroForm.valid) {       
      this.showMsg= true;
      let request = this.cadastroService.cadastroRequest;
      
      request.nome = this.cadastroForm.get('nome').value;
      request.dataNascimento = this.cadastroForm.get('data_nascimento').value;
      request.email = this.cadastroForm.get('email').value;
      request.celular = this.cadastroForm.get('celular').value;
      request.senha = this.cadastroForm.get('senha').value;
      
      //this.cadastroService.cadastrarUsuario().subscribe(usuario => {}, err => {console.log(err)});
      this.limparFormulario();
    }
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

  private limparFormulario (){
    this.cadastroForm.reset({
      'nome': ''
    });
  }
}
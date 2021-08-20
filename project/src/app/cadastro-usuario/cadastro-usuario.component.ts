import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from '../service/cadastroService';
import { DateAdapter } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  public cadastroForm: FormGroup;

  public maskTelefone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(private formBuilder: FormBuilder,
              private cadastroService: CadastroService,
              private dateAdapter: DateAdapter<Date>,
              private toastr: ToastrService,
              private router: Router) 
              {
                this.dateAdapter.setLocale('pt-BR');
              }

  ngOnInit(): void {
    this.populateFromOnInit();
  }

  cadastrarUsuario(): void {    
    if(this.cadastroForm.valid) {       
      let request = this.cadastroService.cadastroRequest;
      
      request.nome = this.cadastroForm.get('nome').value;
      request.dataNascimento = this.cadastroForm.get('data_nascimento').value;
      request.email = this.cadastroForm.get('email').value;
      request.celular = this.cadastroForm.get('celular').value;
      request.senha = this.cadastroForm.get('senha').value;
      
      this.router.navigate(['/']);

      this.toastr.success('Cadastro efetuado com sucesso!', 'Parabéns');

      this.cadastroService.cadastrarUsuario().subscribe(usuario => {}, err => {console.log(err)});
    } else {
      this.toastr.error('Por favor, preencha todos os campos obrigatórios', 'Erro', {progressBar: true});
    }
  }

  populateFromOnInit() {
    this.cadastroForm = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      data_nascimento: new FormControl(Date(), [Validators.required]),
      email: new FormControl('', [Validators.required]),
      celular: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
    });
  }
}
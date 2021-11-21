import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from '../service/cadastro.service';
import { DateAdapter } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CadastrarUsuarioRequest } from '../service/interface/request/cadastrarUsuarioRequest';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  public maskTelefone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  
  public cadastroForm: FormGroup;
  cadastroRequest: CadastrarUsuarioRequest;
  
  constructor(private formBuilder: FormBuilder,
              private cadastroService: CadastroService,
              private dateAdapter: DateAdapter<Date>,
              private toastr: ToastrService,
              private router: Router) 
              {
                this.dateAdapter.setLocale('pt-BR');
              }

  ngOnInit(): void {
    this.populateFormOnInit();
  }

  cadastrarUsuario(): void {    
    if(this.cadastroForm.valid) {       
      this.cadastroRequest = new CadastrarUsuarioRequest();
      
      this.cadastroRequest.nome = this.cadastroForm.get('nome').value;
      this.cadastroRequest.dataNascimento = this.cadastroForm.get('data_nascimento').value;
      this.cadastroRequest.email = this.cadastroForm.get('email').value;
      this.cadastroRequest.celular = this.cadastroForm.get('celular').value;
      this.cadastroRequest.senha = this.cadastroForm.get('senha').value;
      
      this.cadastroService.cadastrarUsuario(this.cadastroRequest).subscribe((response) => {
        this.router.navigate(['/']);
        this.toastr.success('Cadastro efetuado com sucesso!', 'Parabéns');
      }, (error) => {
        if(error.status == 400) {
          this.cadastroForm.get('email').setValue('');
          this.toastr.error(error.error.message, 'Erro');
        } else {
          this.toastr.error('Tente novamente mais tarde!', 'Erro');
        }
      });
    } else {
      this.toastr.error('Por favor, preencha todos os campos obrigatórios', 'Erro');
    }
  }

  populateFormOnInit() {
    this.cadastroForm = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      data_nascimento: new FormControl(Date(), [Validators.required]),
      email: new FormControl('', [Validators.required]),
      celular: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
    });
  }
}
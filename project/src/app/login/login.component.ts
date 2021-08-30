import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser, GoogleLoginProvider } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { CadastroService } from '../service/cadastro.service';
import { CadastrarUsuarioRequest } from '../service/interface/request/cadastrarUsuarioRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  socialUser: SocialUser;  
  cadastroRequest: CadastrarUsuarioRequest;

  public loginForm: FormGroup;

  constructor(private socialAuthService: SocialAuthService,
              private formBuilder: FormBuilder,
              private cadastroService: CadastroService,
              private toastr: ToastrService,
              private router: Router,
              private authService: AuthService
            ) {}

  ngOnInit(): void {
    this.populateFormOnInit();
  }

  login(): void {
    if (this.loginForm.valid) {
      let email = this.loginForm.get('email').value;
      let senha = this.loginForm.get('senha').value;

      this.authService.autenticarUsuario(email, senha).subscribe((response) => {
        this.toastr.info('AAAEEE', 'Atenção');
        console.log(response.body.token);
      }, (responseError) => {
        if(responseError.status == 401) {      
          this.toastr.error('Email ou Senha Inválido!', 'Atenção');
          this.loginForm.reset();
        } else {
          this.toastr.error('Tente novamente mais tarde!', 'Erro');
        }
      });
    } else {
      this.toastr.error('Preencha todos os campos obrigatórios', 'Erro');
    }
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res) => {

      this.cadastroRequest = new CadastrarUsuarioRequest;
      this.cadastroRequest.email = res.email;

      this.cadastroService.verificarCadastro(this.cadastroRequest).subscribe((response) => {               
        if (response.status == 204) {
          this.cadastroRequest = new CadastrarUsuarioRequest();
          
          this.cadastroRequest.nome = res.name;
          this.cadastroRequest.email = res.email;
          this.cadastroRequest.senha = res.id;
          this.cadastroRequest.googleCode = res.authToken;

          this.cadastroService.cadastrarUsuario(this.cadastroRequest);
        }
        
        this.router.navigate(['dashboard']);
      }, () => {
        this.toastr.error('Tente novamente mais tarde!', 'Erro');
      });
    });
  }

  populateFormOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
    });
  }
}
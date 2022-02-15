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

  loading = false;

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
      this.loading = true;

      let email = this.loginForm.get('email').value;
      let senha = this.loginForm.get('senha').value;

      this.authService.autenticarUsuario(email, senha).subscribe((response) => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      }, (responseError) => {
        if(responseError.status == 401) {      
          this.loading = false;
          this.toastr.error('Email ou Senha Inválido!', 'Atenção');
          this.loginForm.reset();
        } else {
          this.loading = false;
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
       this.cadastroRequest.nome = res.firstName + " " + res.lastName;
       this.cadastroRequest.idGoogle = res.id;

       this.cadastroService.verificarCadastro(this.cadastroRequest).subscribe((res) => {
        this.router.navigate(['dashboard']); 
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
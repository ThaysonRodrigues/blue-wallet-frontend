import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser, GoogleLoginProvider } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { CadastroService } from '../service/cadastroService';
import { CadastrarUsuarioRequest } from '../service/interface/request/cadastrarUsuarioRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  socialUser: SocialUser;  
  cadastroRequest: CadastrarUsuarioRequest;

  constructor(private socialAuthService: SocialAuthService,
              private cadastroService: CadastroService,
              private toastr: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {}

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
}
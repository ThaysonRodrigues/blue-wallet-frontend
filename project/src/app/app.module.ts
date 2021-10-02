import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TextMaskModule } from 'angular2-text-mask';
import { ToastrModule } from 'ngx-toastr';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouteRoutingModule } from './route-routing.module';
import { CadastroService } from './service/cadastro.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './service/auth.service';
import { MenuComponent } from './snippets/menu/menu.component';
import { ReceitasComponent } from './receitas/receitas.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroUsuarioComponent,
    LoginComponent,
    DashboardComponent,
    MenuComponent,
    ReceitasComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    RouteRoutingModule,
    HttpClientModule,  
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    TextMaskModule,
    ToastrModule.forRoot(),
    SocialLoginModule
  ],
  exports: [
    MatInputModule
  ],
  providers: [CadastroService, AuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1008478321576-mmistilbbeecje21inkate8m7ilq23v6.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

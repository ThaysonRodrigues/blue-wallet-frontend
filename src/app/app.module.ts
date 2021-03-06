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
import { MatDialogModule } from '@angular/material/dialog';
import { DialogReceitaComponent } from './dialog-receita/dialog-receita.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { NgxCurrencyModule } from "ngx-currency";
import { MatTableModule } from '@angular/material/table';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxLoadingModule } from 'ngx-loading';
import localePt from '@angular/common/locales/pt';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { DespesasComponent } from './despesas/despesas.component';
import { DialogDespesaComponent } from './dialog-despesa/dialog-despesa.component';
import { SampleGuard } from 'src/environments/sampleGuard';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { ChartsModule } from 'ng2-charts';
import { MatTableExporterModule } from 'mat-table-exporter';
import { DialogDadosUsuarioComponent } from './dialog-dados-usuario/dialog-dados-usuario.component';
import { DialogRecuperarSenhaComponent } from './dialog-recuperar-senha/dialog-recuperar-senha.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    CadastroUsuarioComponent,
    LoginComponent,
    DashboardComponent,
    MenuComponent,
    ReceitasComponent,
    DialogReceitaComponent,
    DespesasComponent,
    DialogDespesaComponent,
    MenuLateralComponent,
    DialogDadosUsuarioComponent,
    DialogRecuperarSenhaComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    ChartsModule,
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
    SocialLoginModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSelectModule,
    NgxCurrencyModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatIconModule,
    MatTableExporterModule,
    NgxLoadingModule.forRoot({
      primaryColour : ' #3F51B5 ',
      SecondColour : ' #3F51B5 ',
      tertiaryColour : ' #3F51B5 '
    })
  ],
  exports: [
    MatInputModule
  ],
  providers:
  [CadastroService, AuthService,
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
    },
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    SampleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

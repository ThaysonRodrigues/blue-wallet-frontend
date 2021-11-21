import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SampleGuard } from 'src/environments/sampleGuard';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DespesasComponent } from './despesas/despesas.component';
import { LoginComponent } from './login/login.component';
import { ReceitasComponent } from './receitas/receitas.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cadastro', component: CadastroUsuarioComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [SampleGuard] },
  { path: 'receitas', component: ReceitasComponent, canActivate: [SampleGuard] },
  { path: 'despesas', component: DespesasComponent, canActivate: [SampleGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RouteRoutingModule { }

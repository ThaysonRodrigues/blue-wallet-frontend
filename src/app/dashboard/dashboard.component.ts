import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { FormControl, FormGroup } from '@angular/forms';

import * as moment from 'moment';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

import { MY_FORMATS } from 'src/environments/myFormats';
import { DashboardService } from '../service/dashboard.service';
import { TokenService } from '../service/token.service';
import { DashboardDTO } from '../service/interface/response/dashboardDTO';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class DashboardComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;

  dataPesquisaDashboard = new FormControl(moment());

  public pesquisaReceitaForm: FormGroup;

  DATE_FORMAT = "YYYY-MM";

  dashboardMensal: DashboardDTO = new DashboardDTO();

  public pieChartType = 'pie';
  public pieChartLabelReceitas = [];
  public pieChartDataReceitas = [];
  public showReceitas = false;

  public pieChartLabelDespesas = [];
  public pieChartDataDespesas = [];
  public showDespesas = false;
  
  public chartColors: any[] = [
    { 
      backgroundColor:["#05AFC4", "#46A34A", "#EA4643", "#FFFCC4", "#B9E8E0"] 
    }];

  constructor(private authService: SocialAuthService,
              private router: Router,
              private dashboardService: DashboardService,
              private tokenService: TokenService) {}

  ngOnInit() {
    console.log('entrou aqui')
   // this.getRelatorioDashboardMensal();

  // this.authService.authState.subscribe((user) => {
  //    this.user = user;
  //    this.loggedIn = (user != null);
   // });

   // if (!this.loggedIn) {
   //   this.router.navigate(['/']);
   // }
  }


  getRelatorioDashboardMensal() {
    var dataPesquisa = moment(this.dataPesquisaDashboard.value).format(this.DATE_FORMAT);
    this.limparGraficos();
    
    this.dashboardService.listarRelatorioDashboard(dataPesquisa, this.tokenService.getToken())
    .subscribe((res) => {    
      this.dashboardMensal = res;

      this.dashboardMensal.receitas.forEach(r => {
        this.showReceitas = true;
        this.pieChartLabelReceitas.push(r.descricao);
        this.pieChartDataReceitas.push(r.valor)
      });

      this.dashboardMensal.despesas.forEach(r => {
        this.showDespesas = true;
        this.pieChartLabelDespesas.push(r.descricao);
        this.pieChartDataDespesas.push(r.valor)
      });
    });       
  }

  private limparGraficos() {
    this.showReceitas = false;
    this.showDespesas = false;

    this.pieChartLabelReceitas = [];
    this.pieChartDataReceitas = [];

    this.pieChartLabelDespesas = [];
    this.pieChartDataDespesas = [];
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.dataPesquisaDashboard.value;
    ctrlValue.year(normalizedYear.year());
    this.dataPesquisaDashboard.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.dataPesquisaDashboard.value;
    ctrlValue.month(normalizedMonth.month());
    this.dataPesquisaDashboard.setValue(ctrlValue);
    datepicker.close();
  }
}
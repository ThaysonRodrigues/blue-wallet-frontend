import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogReceitaComponent } from '../dialog-receita/dialog-receita.component';
import { ReceitaDTO } from '../service/interface/response/receitaDTO';
import { LancamentoReceitaService } from '../service/lancamento-receita.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html'
})
export class ReceitasComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private lancamentoReceitaService: LancamentoReceitaService,
              private tokenService: TokenService
              ) { }
  
  listLancamentoReceita: ReceitaDTO[];
   
  displayedColumns: string [] = ['idReceita'];

  ngOnInit(): void {
    this.lancamentoReceitaService.listarLancamentoReceita('2021-09', this.tokenService.getToken())
      .subscribe((res) => {
        this.listLancamentoReceita = res;
        console.log(res);
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogReceitaComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
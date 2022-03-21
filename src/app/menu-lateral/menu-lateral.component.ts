import { DialogDadosUsuarioComponent } from './../dialog-dados-usuario/dialog-dados-usuario.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

  constructor(private router: Router, private tokenService: TokenService, public dialog: MatDialog) { }

  ngOnInit(): void {}

  logout() {
    this.tokenService.removeToken();
    this.tokenService.removeUserName();
    this.router.navigate(['/']);
  }

  abrirModalDadosCadastrais() {
    const dialogRef = this.dialog.open(DialogDadosUsuarioComponent, {
      width: '500px'
    });
  }
}

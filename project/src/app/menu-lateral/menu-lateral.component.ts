import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

  constructor(private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {}

  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['/']);
  }
}
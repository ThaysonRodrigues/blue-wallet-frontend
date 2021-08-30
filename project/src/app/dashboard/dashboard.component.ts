import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';

import { CadastroService } from '../service/cadastro.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;

  constructor(private authService: SocialAuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });

    if (!this.loggedIn) {
      this.router.navigate(['/']);
    }
  }
}
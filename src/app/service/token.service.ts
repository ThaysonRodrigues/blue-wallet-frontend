import { Injectable } from '@angular/core';
import { Key } from 'protractor';

const KEY = 'authToken'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {}

  hasToken() {
    var token: String = this.getToken();
    return token && token.length > 0;
  }

  setToken(token) {
    window.localStorage.setItem(KEY, token);
  }

  getToken() {
    return window.localStorage.getItem(KEY);
  }

  removeToken() {
    window.localStorage.removeItem(KEY);
  }
}

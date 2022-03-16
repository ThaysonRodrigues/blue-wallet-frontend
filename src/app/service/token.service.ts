import { Injectable } from '@angular/core';

const KEY = 'authToken'
const KEY_USER = 'user'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {}

  setNomeUsuario(nomeUsuario) {
    window.localStorage.setItem(KEY_USER, nomeUsuario);
  }

  getNomeUsuario() {
    return window.localStorage.getItem(KEY_USER);
  }

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

  removeUserName() {
    window.localStorage.removeItem(KEY_USER);
  }
}

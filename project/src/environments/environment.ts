const apiURL = '/api';

export const environment = {
  production: false,
  cadastrarNovoUsuario: apiURL + '/conta/cadastrar',
  verificarConta: apiURL + '/conta/verificar',
  autenticarUsuario: apiURL + '/auth',
  pesquisarCategoriaReceita: apiURL + "/categoria/receita"
};


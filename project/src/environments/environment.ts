const apiURL = '/api';

export const environment = {
  production: false,
  cadastrarNovoUsuario: apiURL + '/conta/cadastrar',
  verificarConta: apiURL + '/conta/verificar',
  autenticarUsuario: apiURL + '/auth',
  pesquisarCategoriaReceita: apiURL + "/categoria/receita",
  gravarLancamentoReceita: apiURL + "/receita/cadastrar",
  listarLancamentoReceita: apiURL + "/receita/pesquisar",
  apagarReceita: apiURL + "/receita/deletar"
};


const apiURL = '/api';

export const environment = {
  production: true,

  cadastrarNovoUsuario: apiURL + '/conta/cadastrar',
  verificarConta: apiURL + '/conta/verificar',
  autenticarUsuario: apiURL + '/auth',

  pesquisarCategoriaReceita: apiURL + "/categoria/receita",
  pesquisarCategoriaDespesa: apiURL + "/categoria/despesa",

  gravarLancamentoReceita: apiURL + "/receita/cadastrar",
  editarLancamentoReceita: apiURL + "/receita/editar",
  listarLancamentoReceita: apiURL + "/receita/pesquisar",
  apagarReceita: apiURL + "/receita/deletar",

  gravarLancamentoDespesa: apiURL + "/despesa/cadastrar",
  editarLancamentoDespesa: apiURL + "/despesa/editar",
  listarLancamentoDespesa: apiURL + "/despesa/pesquisar",
  apagarDespesa: apiURL + "/despesa/deletar"
};

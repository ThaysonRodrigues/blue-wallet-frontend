const apiURL = 'https://sboot-blue-wallet.herokuapp.com/api';

export const environment = {
  production: true,

  cadastrarNovoUsuario: apiURL + '/conta/cadastrar',
  verificarConta: apiURL + '/conta/verificar',
  atualizarDadosCadastrais: apiURL + "/conta/atualizar-dados-cadastrais",
  enviarCodigoRecuperarSenha: apiURL + "/recuperar-conta/enviar-email/",
  verificarCodigoRecuperarSenha: apiURL + "/recuperar-conta/verificar",
  atualizarSenha: apiURL + "/recuperar-conta/atualizar-senha",

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
  apagarDespesa: apiURL + "/despesa/deletar",

  listarRelatorioDashboard: apiURL + "/dashboard",

  consultarUserName: apiURL + "/conta/dados-cadastrais"
};

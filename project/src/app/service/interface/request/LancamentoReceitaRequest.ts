export class LancamentoReceitaRequest {
    idReceita: number;
    descricao: string;
    categoriaReceita: number;
    dataLancamento: string;
    flgPagamentoEfetuado: boolean;
    numeroParcelas: number;
    valor: number;
}
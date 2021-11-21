export class LancamentoDespesaRequest {
    idDespesa: number;
    descricao: string;
    categoriaDespesa: number;
    dataPagamento: string;
    flgPagamentoEfetuado: boolean;
    numeroParcelas: number;
    valor: number;
}
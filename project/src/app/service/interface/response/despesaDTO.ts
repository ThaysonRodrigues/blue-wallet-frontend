export interface DespesaDTO {
    content: DespesaDtoContent
}

export class DespesaDtoContent {
    idDespesa: number;
    categoriaDespesa: number;
    descricao: string;
    numeroParcelas: number;
    datapagamento: string;
    valor: number;
    flgPagamentoEfetuado: boolean
}
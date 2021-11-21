export interface ReceitaDTO {
    content: ReceitaDtoContent
}

export class ReceitaDtoContent {
    idReceita: number;
    categoriaReceita: number;
    descricao: string;
    numeroParcelas: number;
    dataLancamento: string;
    valor: number;
    flgPagamentoEfetuado: boolean
}
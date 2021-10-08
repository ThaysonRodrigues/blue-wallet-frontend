export interface ReceitaDTO {
    idReceita: number;
    categoriaReceita: number;
    descricao: string;
    numeroParcelas: number;
    dataLancamento: string;
    valor: number;
    flgPagamentoEfetuado: boolean
}
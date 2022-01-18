import { CategoriaDashboardDTO } from "./categoriadasboardDTO";

export class DashboardDTO {
    valorTotalReceitas: string;
    valorTotalDespesas: string;
    valorSaldoAtual: string
    receitas: CategoriaDashboardDTO[];
    despesas: CategoriaDashboardDTO[];
}
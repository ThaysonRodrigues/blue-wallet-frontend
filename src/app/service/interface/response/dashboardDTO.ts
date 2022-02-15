import { CategoriaDashboardDTO } from "./categoriaDasboardDTO";

export class DashboardDTO {
    valorTotalReceitas: string;
    valorTotalDespesas: string;
    valorSaldoAtual: string
    receitas: CategoriaDashboardDTO[];
    despesas: CategoriaDashboardDTO[];
}
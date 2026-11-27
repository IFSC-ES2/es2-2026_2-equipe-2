import { QueryResultRow } from "pg";
import { BaseRepository } from "./BaseRepository";
import {
  ResumoVendas,
  ProdutoMaisVendido,
  CategoriaMaisVendida,
  ProdutoEstoque,
  ProdutoEstoqueBaixo,
} from "../models/Dashboard";

const PERIODOS = [30, 90, 365] as const;

function sufixoPeriodo(dias: number): string {
  if (!(PERIODOS as readonly number[]).includes(dias)) {
    throw new Error(`Período inválido: ${dias}. Use ${PERIODOS.join(", ")}.`);
  }
  return `${dias}d`;
}

export class DashboardRepository extends BaseRepository<QueryResultRow> {
  protected override tableName = "pedidos";

  // Ganhos, número de vendas e unidades vendidas no período (só pedidos CONCLUIDO)
  public async getResumoVendas(dias: number): Promise<ResumoVendas> {
      const result = await this.query<ResumoVendas>(
        `SELECT * FROM vw_resumo_vendas_${sufixoPeriodo(dias)}`,
      );
      return (
        result.rows[0] ?? {
          ganhos_totais: 0,
          total_vendas: 0,
          total_produtos_vendidos: 0,
        }
      );
    }

  public async getProdutosMaisVendidos(
      dias: number,
      limite: number,
    ): Promise<ProdutoMaisVendido[]> {
      const result = await this.query<ProdutoMaisVendido>(
        `SELECT * FROM vw_produtos_vendidos_${sufixoPeriodo(dias)}
         ORDER BY unidades_vendidas DESC, receita DESC, id
         LIMIT $1`,
        [limite],
      );
      return result.rows;
    }

  public async getCategoriaMaisVendida(
      dias: number,
    ): Promise<CategoriaMaisVendida | null> {
      const result = await this.query<CategoriaMaisVendida>(
        `SELECT * FROM vw_categorias_vendidas_${sufixoPeriodo(dias)}
         ORDER BY unidades_vendidas DESC, receita DESC, id
         LIMIT 1`,
      );
      return result.rows[0] ?? null;
    }

  public async getProdutosEstoqueBaixo(): Promise<ProdutoEstoqueBaixo[]> {
      const result = await this.query<ProdutoEstoqueBaixo>(
        `SELECT * FROM vw_estoque_baixo
         ORDER BY faltam_para_o_minimo DESC, nome`,
      );
      return result.rows;
    }

  public async getMaioresEstoques(): Promise<ProdutoEstoque[]> {
      const result = await this.query<ProdutoEstoque>(
        `SELECT * FROM vw_maiores_estoques`,
      );
      return result.rows;
    }

  public async getTotalProdutos(): Promise<number> {
    const result = await this.query<{ total: number }>(
      `SELECT COUNT(*)::int AS total FROM produtos`,
    );

    return result.rows[0]?.total ?? 0;
  }
}

export default new DashboardRepository();

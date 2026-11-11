import { QueryResultRow } from "pg";
import { BaseRepository } from "./BaseRepository";
import {
  ResumoVendas,
  ProdutoMaisVendido,
  CategoriaMaisVendida,
  ProdutoEstoque,
  ProdutoEstoqueBaixo,
} from "../models/Dashboard";

export class DashboardRepository extends BaseRepository<QueryResultRow> {
  protected override tableName = "pedidos";

  // Ganhos, número de vendas e unidades vendidas no período (só pedidos CONCLUIDO)
  public async getResumoVendas(dias: number): Promise<ResumoVendas> {
    const pedidos = await this.query<{
      ganhos_totais: number;
      total_vendas: number;
    }>(
      `SELECT
         COALESCE(SUM(p.valor_total), 0)::float8 AS ganhos_totais,
         COUNT(*)::int                           AS total_vendas
       FROM pedidos p
       WHERE p.status = 'CONCLUIDO'
         AND p.data_pedido >= NOW() - ($1::int * INTERVAL '1 day')`,
      [dias],
    );

    const itens = await this.query<{ total_produtos_vendidos: number }>(
      `SELECT COALESCE(SUM(ip.quantidade), 0)::int AS total_produtos_vendidos
       FROM itens_pedido ip
       JOIN pedidos p ON p.id = ip.pedido_id
       WHERE p.status = 'CONCLUIDO'
         AND p.data_pedido >= NOW() - ($1::int * INTERVAL '1 day')`,
      [dias],
    );

    return {
      ganhos_totais: pedidos.rows[0]?.ganhos_totais ?? 0,
      total_vendas: pedidos.rows[0]?.total_vendas ?? 0,
      total_produtos_vendidos: itens.rows[0]?.total_produtos_vendidos ?? 0,
    };
  }

  public async getProdutosMaisVendidos(
    dias: number,
    limite: number,
  ): Promise<ProdutoMaisVendido[]> {
    const result = await this.query<ProdutoMaisVendido>(
      `SELECT
         pr.id,
         pr.sku,
         pr.nome,
         SUM(ip.quantidade)::int                 AS unidades_vendidas,
         SUM(ip.quantidade * ip.preco_unitario)::float8 AS receita
       FROM itens_pedido ip
       JOIN pedidos  p  ON p.id  = ip.pedido_id AND p.status = 'CONCLUIDO'
       JOIN produtos pr ON pr.id = ip.produto_id
       WHERE p.data_pedido >= NOW() - ($1::int * INTERVAL '1 day')
       GROUP BY pr.id, pr.sku, pr.nome
       ORDER BY unidades_vendidas DESC, receita DESC
       LIMIT $2`,
      [dias, limite],
    );

    return result.rows;
  }

  public async getCategoriaMaisVendida(
    dias: number,
  ): Promise<CategoriaMaisVendida | null> {
    const result = await this.query<CategoriaMaisVendida>(
      `SELECT
         c.id,
         c.nome,
         SUM(ip.quantidade)::int                 AS unidades_vendidas,
         SUM(ip.quantidade * ip.preco_unitario)::float8 AS receita
       FROM itens_pedido ip
       JOIN pedidos    p  ON p.id  = ip.pedido_id AND p.status = 'CONCLUIDO'
       JOIN produtos   pr ON pr.id = ip.produto_id
       JOIN categorias c  ON c.id  = pr.categoria_id
       WHERE p.data_pedido >= NOW() - ($1::int * INTERVAL '1 day')
       GROUP BY c.id, c.nome
       ORDER BY unidades_vendidas DESC, receita DESC
       LIMIT 1`,
      [dias],
    );

    return result.rows[0] ?? null;
  }

  public async getProdutosEstoqueBaixo(): Promise<ProdutoEstoqueBaixo[]> {
    const result = await this.query<ProdutoEstoqueBaixo>(
      `SELECT
         id,
         sku,
         nome,
         quantidade,
         estoque_minimo,
         (estoque_minimo - quantidade) AS faltam_para_o_minimo
       FROM produtos
       WHERE quantidade <= estoque_minimo
       ORDER BY (quantidade - estoque_minimo), nome`,
    );

    return result.rows;
  }

  public async getMaioresEstoques(limite: number): Promise<ProdutoEstoque[]> {
    const result = await this.query<ProdutoEstoque>(
      `SELECT id, sku, nome, quantidade, estoque_minimo
       FROM produtos
       ORDER BY quantidade DESC, nome
       LIMIT $1`,
      [limite],
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
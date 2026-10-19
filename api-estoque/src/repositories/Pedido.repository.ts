import { PoolClient, QueryResultRow } from "pg";
import { BaseRepository } from "./BaseRepository";
import {
  Pedido,
  PedidoCreate,
  PedidoComRelacionamentos,
  ItemPedidoComProduto,
} from "../models/Pedido";

interface PedidoRow extends Pedido, QueryResultRow {
  cliente_nome: string | null;
  cliente_email: string | null;
}

interface ItemPedidoRow extends QueryResultRow {
  id: number;
  pedido_id: number;
  produto_id: number;
  quantidade: number;
  preco_unitario: number;
  produto_sku: string;
  produto_nome: string;
}

export class PedidoRepository extends BaseRepository<Pedido> {
  protected override tableName = "pedidos";

  public async createComItens(data: PedidoCreate): Promise<Pedido> {
    const client: PoolClient = await this.pool.connect();

    try {
      await client.query("BEGIN");

      const valorTotal = data.itens.reduce(
        (total, item) => total + item.quantidade * item.preco_unitario,
        0,
      );

      const pedidoResult = await client.query<Pedido>(
        `INSERT INTO pedidos (cliente_id, data_pedido, valor_total)
         VALUES ($1, COALESCE($2, NOW()), $3)
         RETURNING *`,
        [data.cliente_id, data.data_pedido ?? null, valorTotal],
      );

      const pedido = pedidoResult.rows[0];

      if (!pedido) {
        throw new Error("Falha ao criar pedido: nenhum registro retornado");
      }

      for (const item of data.itens) {
        await client.query(
          `INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario)
           VALUES ($1, $2, $3, $4)`,
          [pedido.id, item.produto_id, item.quantidade, item.preco_unitario],
        );
      }

      await client.query("COMMIT");

      return pedido;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  public async findAllComRelacionamentos(): Promise<
    PedidoComRelacionamentos[]
  > {
    const pedidosResult = await this.query<PedidoRow>(
      `SELECT p.*, c.nome AS cliente_nome, c.email AS cliente_email
       FROM ${this.tableName} p
       LEFT JOIN clientes c ON c.id = p.cliente_id
       ORDER BY p.id DESC`,
    );

    const result: PedidoComRelacionamentos[] = [];

    for (const row of pedidosResult.rows) {
      const itens = await this.findItensByPedidoId(row.id);
      result.push(this.mapRowToPedidoComRelacionamentos(row, itens));
    }

    return result;
  }

  public async findByIdComRelacionamentos(
    id: number,
  ): Promise<PedidoComRelacionamentos | null> {
    const pedidoResult = await this.query<PedidoRow>(
      `SELECT p.*, c.nome AS cliente_nome, c.email AS cliente_email
       FROM ${this.tableName} p
       LEFT JOIN clientes c ON c.id = p.cliente_id
       WHERE p.id = $1`,
      [id],
    );

    const row = pedidoResult.rows[0];
    if (!row) return null;

    const itens = await this.findItensByPedidoId(id);
    return this.mapRowToPedidoComRelacionamentos(row, itens);
  }

  private async findItensByPedidoId(
    pedidoId: number,
  ): Promise<ItemPedidoComProduto[]> {
    const result = await this.query<ItemPedidoRow>(
      `SELECT ip.*, pr.sku AS produto_sku, pr.nome AS produto_nome
       FROM itens_pedido ip
       LEFT JOIN produtos pr ON pr.id = ip.produto_id
       WHERE ip.pedido_id = $1
       ORDER BY ip.id`,
      [pedidoId],
    );

    return result.rows.map((item) => ({
      id: item.id,
      pedido_id: item.pedido_id,
      produto_id: item.produto_id,
      quantidade: item.quantidade,
      preco_unitario: item.preco_unitario,
      produto: {
        id: item.produto_id,
        sku: item.produto_sku,
        nome: item.produto_nome,
      } as never,
    }));
  }

  private mapRowToPedidoComRelacionamentos(
    row: PedidoRow,
    itens: ItemPedidoComProduto[],
  ): PedidoComRelacionamentos {
    const { cliente_nome, cliente_email, ...pedido } = row;

    return {
      ...pedido,
      cliente: pedido.cliente_id
        ? ({
            id: pedido.cliente_id,
            nome: cliente_nome,
            email: cliente_email,
          } as never)
        : null,
      itens,
    };
  }
}

export default new PedidoRepository();

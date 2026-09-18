import { QueryResultRow } from "pg";
import { BaseRepository } from "./BaseRepository";
import {
  Produto,
  ProdutoComRelacionamentos,
  ProdutoCreate,
  ProdutoUpdate,
} from "../models/Produto";

interface ProdutoComRelacionamentosRow extends Produto, QueryResultRow {
  categoria_nome: string | null;
  fornecedor_nome: string | null;
  fornecedor_cnpj: string | null;
  fornecedor_telefone: string | null;
  fornecedor_email: string | null;
}

export class ProdutoRepository extends BaseRepository<Produto> {
  protected override tableName = "produtos";

  public async create(data: ProdutoCreate): Promise<Produto> {
    return this.insert(data);
  }

  public override async update(
    id: number,
    data: ProdutoUpdate,
  ): Promise<Produto | null> {
    return super.update(id, { ...data, atualizado_em: new Date() });
  }

  public async findByCategoria(categoriaId: number): Promise<Produto[]> {
    const result = await this.query<Produto>(
      `SELECT * FROM ${this.tableName} WHERE categoria_id = $1 ORDER BY id`,
      [categoriaId],
    );
    return result.rows;
  }

  public async findByFornecedor(fornecedorId: number): Promise<Produto[]> {
    const result = await this.query<Produto>(
      `SELECT * FROM ${this.tableName} WHERE fornecedor_id = $1 ORDER BY id`,
      [fornecedorId],
    );
    return result.rows;
  }

  public async findLowStock(): Promise<Produto[]> {
    const result = await this.query<Produto>(
      `SELECT * FROM ${this.tableName} WHERE quantidade <= estoque_minimo ORDER BY id`,
    );
    return result.rows;
  }

  public async decrementarEstoque(
    id: number,
    quantidade: number,
  ): Promise<Produto | null> {
    const result = await this.query<Produto>(
      `UPDATE ${this.tableName}
       SET quantidade = quantidade - $2, atualizado_em = NOW()
       WHERE id = $1 AND quantidade >= $2
       RETURNING *`,
      [id, quantidade],
    );
    return result.rows[0] || null;
  }

  public async incrementarEstoque(
    id: number,
    quantidade: number,
  ): Promise<Produto | null> {
    const result = await this.query<Produto>(
      `UPDATE ${this.tableName}
       SET quantidade = quantidade + $2, atualizado_em = NOW()
       WHERE id = $1
       RETURNING *`,
      [id, quantidade],
    );
    return result.rows[0] || null;
  }

  public async findByIdWithRelacionamentos(
    id: number,
  ): Promise<ProdutoComRelacionamentos | null> {
    const result = await this.query<ProdutoComRelacionamentosRow>(
      `SELECT p.*,
              c.nome AS categoria_nome,
              f.nome AS fornecedor_nome,
              f.cnpj AS fornecedor_cnpj,
              f.telefone AS fornecedor_telefone,
              f.email AS fornecedor_email
       FROM ${this.tableName} p
       LEFT JOIN categorias c ON c.id = p.categoria_id
       LEFT JOIN fornecedores f ON f.id = p.fornecedor_id
       WHERE p.id = $1`,
      [id],
    );
    return result.rows[0]
      ? this.mapRowToProdutoComRelacionamentos(result.rows[0])
      : null;
  }

  public async findAllWithRelacionamentos(): Promise<
    ProdutoComRelacionamentos[]
  > {
    const result = await this.query<ProdutoComRelacionamentosRow>(
      `SELECT p.*,
              c.nome AS categoria_nome,
              f.nome AS fornecedor_nome,
              f.cnpj AS fornecedor_cnpj,
              f.telefone AS fornecedor_telefone,
              f.email AS fornecedor_email
       FROM ${this.tableName} p
       LEFT JOIN categorias c ON c.id = p.categoria_id
       LEFT JOIN fornecedores f ON f.id = p.fornecedor_id
       ORDER BY p.id`,
    );
    return result.rows.map((row) =>
      this.mapRowToProdutoComRelacionamentos(row),
    );
  }

  private mapRowToProdutoComRelacionamentos(
    row: ProdutoComRelacionamentosRow,
  ): ProdutoComRelacionamentos {
    const {
      categoria_nome,
      fornecedor_nome,
      fornecedor_cnpj,
      fornecedor_telefone,
      fornecedor_email,
      ...produto
    } = row;

    return {
      ...produto,
      categoria: produto.categoria_id
        ? { id: produto.categoria_id, nome: categoria_nome as string }
        : null,
      fornecedor: produto.fornecedor_id
        ? {
            id: produto.fornecedor_id,
            nome: fornecedor_nome as string,
            cnpj: fornecedor_cnpj,
            telefone: fornecedor_telefone,
            email: fornecedor_email,
          }
        : null,
    };
  }
}

export default new ProdutoRepository();

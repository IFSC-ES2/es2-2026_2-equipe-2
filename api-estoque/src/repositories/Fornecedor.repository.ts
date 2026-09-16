import { BaseRepository } from "./BaseRepository";
import {
  Fornecedor,
  FornecedorCreate,
  FornecedorUpdate,
} from "../models/Fornecedor";

export class FornecedorRepository extends BaseRepository<Fornecedor> {
  protected override tableName = "fornecedores";

  public async create(data: FornecedorCreate): Promise<Fornecedor> {
    return this.insert(data);
  }

  public override async update(
    id: number,
    data: FornecedorUpdate,
  ): Promise<Fornecedor | null> {
    return super.update(id, data);
  }

  public async findByCnpj(cnpj: string): Promise<Fornecedor | null> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE cnpj = $1`,
      [cnpj],
    );
    return result.rows[0] || null;
  }

  public async findByNome(nome: string): Promise<Fornecedor[]> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE nome ILIKE $1 ORDER BY id`,
      [`%${nome}%`],
    );
    return result.rows;
  }
}

export default new FornecedorRepository();

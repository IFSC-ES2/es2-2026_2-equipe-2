import { BaseRepository } from "./BaseRepository";
import { Cliente, ClienteCreate, ClienteUpdate } from "../models/Cliente";

export class ClienteRepository extends BaseRepository<Cliente> {
  protected override tableName = "clientes";

  public async create(data: ClienteCreate): Promise<Cliente> {
    return this.insert(data);
  }

  public override async update(
    id: number,
    data: ClienteUpdate,
  ): Promise<Cliente | null> {
    return super.update(id, data);
  }

  public async findByEmail(email: string): Promise<Cliente | null> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE email = $1`,
      [email],
    );
    return result.rows[0] || null;
  }

  public async findByDocumento(documento: string): Promise<Cliente | null> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE documento = $1`,
      [documento],
    );
    return result.rows[0] || null;
  }

  public async findByNome(nome: string): Promise<Cliente[]> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE nome ILIKE $1 ORDER BY id`,
      [`%${nome}%`],
    );
    return result.rows;
  }
}

export default new ClienteRepository();

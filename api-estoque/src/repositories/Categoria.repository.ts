import { BaseRepository } from "./BaseRepository";
import {
  Categoria,
  CategoriaCreate,
  CategoriaUpdate,
} from "../models/Categoria";

export class CategoriaRepository extends BaseRepository<Categoria> {
  protected override tableName = "categorias";

  public async create(data: CategoriaCreate): Promise<Categoria> {
    return this.insert(data);
  }

  public override async update(
    id: number,
    data: CategoriaUpdate,
  ): Promise<Categoria | null> {
    return super.update(id, data);
  }

  public async findByNome(nome: string): Promise<Categoria | null> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE nome = $1`,
      [nome],
    );
    return result.rows[0] || null;
  }
}

export default new CategoriaRepository();

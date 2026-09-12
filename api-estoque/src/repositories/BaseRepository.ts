import { Pool, QueryResult, QueryResultRow } from "pg";
import pool from "../config/database";

export abstract class BaseRepository<T extends QueryResultRow> {
  protected tableName: string = "";
  protected pool: Pool = pool;

  protected async query<R extends QueryResultRow = any>(
    text: string,
    params?: any[],
  ): Promise<QueryResult<R>> {
    try {
      return await this.pool.query<R>(text, params);
    } catch (error) {
      console.error(`Database error in ${this.tableName}:`, error);
      throw error;
    }
  }

  public async findAll(): Promise<T[]> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} ORDER BY id`,
    );
    return result.rows;
  }

  public async findById(id: number): Promise<T | null> {
    const result = await this.query(
      `SELECT * FROM ${this.tableName} WHERE id = $1`,
      [id],
    );
    return result.rows[0] || null;
  }

  public async delete(id: number): Promise<void> {
    await this.query(`DELETE FROM ${this.tableName} WHERE id = $1`, [id]);
  }

  protected async insert(data: Record<string, any>): Promise<T> {
    const entries = Object.entries(data)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [
        key,
        value instanceof Date ? value.toISOString() : value,
      ]);

    const fields = entries.map(([key]) => key);
    const values = entries.map(([_, value]) => value);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");

    const query = `
      INSERT INTO ${this.tableName} (${fields.join(", ")}) 
      VALUES (${placeholders}) 
      RETURNING *
    `;

    const result = await this.query(query, values);
    return result.rows[0];
  }

  protected async update(
    id: number,
    data: Record<string, any>,
  ): Promise<T | null> {
    const entries = Object.entries(data)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [
        key,
        value instanceof Date ? value.toISOString() : value,
      ]);

    if (entries.length === 0) {
      throw new Error("No fields to update");
    }

    const setClause = entries
      .map(([key], index) => `${key} = $${index + 2}`)
      .join(", ");

    const values = [id, ...entries.map(([_, value]) => value)];

    const query = `
      UPDATE ${this.tableName} 
      SET ${setClause} 
      WHERE id = $1 
      RETURNING *
    `;

    const result = await this.query(query, values);
    return result.rows[0] || null;
  }
}

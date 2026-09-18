export interface Categoria {
  id: number;
  nome: string;
}

export type CategoriaCreate = Omit<Categoria, "id">;

export type CategoriaUpdate = Partial<CategoriaCreate>;

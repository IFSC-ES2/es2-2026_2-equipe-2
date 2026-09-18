export interface Fornecedor {
  id: number;
  nome: string;
  cnpj: string | null;
  telefone: string | null;
  email: string | null;
}

export type FornecedorCreate = Omit<Fornecedor, "id">;

export type FornecedorUpdate = Partial<FornecedorCreate>;

import { Categoria } from "./Categoria";
import { Fornecedor } from "./Fornecedor";

export interface Produto {
  id: number;
  sku: string;
  nome: string;
  descricao: string | null;
  categoriaId: number | null;
  fornecedorId: number | null;
  preco: number;
  quantidade: number;
  estoqueMinimo: number;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface ProdutoComRelacionamentos extends Produto {
  categoria: Categoria | null;
  fornecedor: Fornecedor | null;
}

export type ProdutoCreate = Omit<
  Produto,
  "id" | "criadoEm" | "atualizadoEm" | "quantidade" | "estoqueMinimo"
> & {
  quantidade?: number;
  estoqueMinimo?: number;
};

export type ProdutoUpdate = Partial<ProdutoCreate>;

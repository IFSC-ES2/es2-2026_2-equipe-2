export interface Produto {
  id: number;
  sku: string;
  nome: string;
  descricao: string | null;
  categoria_id: number | null;
  fornecedor_id: number | null;
  preco: number;
  quantidade: number;
  estoque_minimo: number;
  criado_em: Date;
  atualizado_em: Date;
}

export type ProdutoCreate = Omit<
  Produto,
  'id' | 'criado_em' | 'atualizado_em' | 'quantidade' | 'estoque_minimo'
> & {
  quantidade?: number;
  estoque_minimo?: number;
};

export type ProdutoUpdate = Partial<ProdutoCreate>;

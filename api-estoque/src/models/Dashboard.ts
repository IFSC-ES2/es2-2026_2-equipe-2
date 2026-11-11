export interface ResumoVendas {
  ganhos_totais: number;
  total_vendas: number;
  total_produtos_vendidos: number;
}

export interface ProdutoMaisVendido {
  id: number;
  sku: string;
  nome: string;
  unidades_vendidas: number;
  receita: number;
}

export interface CategoriaMaisVendida {
  id: number;
  nome: string;
  unidades_vendidas: number;
  receita: number;
}

export interface ProdutoEstoque {
  id: number;
  sku: string;
  nome: string;
  quantidade: number;
  estoque_minimo: number;
}

export interface ProdutoEstoqueBaixo extends ProdutoEstoque {
  faltam_para_o_minimo: number;
}

export interface EstoqueResumo {
  total_produtos: number;
  produtos_estoque_baixo: ProdutoEstoqueBaixo[];
  maiores_estoques: ProdutoEstoque[];
}

export interface DashboardResumo {
  periodo: number;
  vendas: ResumoVendas;
  produtos_mais_vendidos: ProdutoMaisVendido[];
  categoria_mais_vendida: CategoriaMaisVendida | null;
  estoque: EstoqueResumo;
}
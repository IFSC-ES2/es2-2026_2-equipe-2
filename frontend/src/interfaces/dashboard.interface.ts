export interface MetricasKpi {
  faturamentoTotal: number;
  totalProdutosVendidos: number;
  categoriaMaisVendida: string;
  produtoMaisVendido: string;
}

export interface ItemVendaRecente {
  id: string | number;
  nomeProduto: string;
  quantidade: number;
  preco: number;
  data: string;
}

export interface PontoDadosGrafico {
  rotulo: string;
  valor: number;
}

export type PeriodoGrafico = '1S' | '1M' | '3M' | '1A';

export interface ItemProdutoEstoque {
  id: string | number;
  nomeProduto: string;
  codigoProduto: string;
  quantidade: number;
  historicoEntrada: string;
  nomeCategoria: string;
}

export interface ItemDistribuicaoCategoria {
  rotulo: string;
  quantidade: number;
  porcentagem: number;
  cor: string;
}

export interface DadosDashboard {
  kpi: MetricasKpi;
  vendasRecentes: ItemVendaRecente[];
  graficoVendas: Record<string, PontoDadosGrafico[]>;
  produtosEstoque: ItemProdutoEstoque[];
  distribuicaoCategorias: ItemDistribuicaoCategoria[];
}

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

// Interfaces consumidas pelos componentes visuais do dashboard
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
  resumo?: DashboardResumo;
}

// Aliases para retrocompatibilidade
export type DashboardData = DadosDashboard;
export type KpiMetrics = MetricasKpi;
export type RecentSaleItem = ItemVendaRecente;
export type ChartDataPoint = PontoDadosGrafico;
export type WarehouseProductItem = ItemProdutoEstoque;
export type CategoryBreakdownItem = ItemDistribuicaoCategoria;

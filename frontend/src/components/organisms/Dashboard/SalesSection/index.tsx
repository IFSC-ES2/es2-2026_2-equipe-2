import React, { useState } from 'react';
import KpiCard from '../../../atoms/KpiCard';
import AreaChart from '../../../molecules/Charts/AreaChart';
import DashboardTable, {
  type ColunaTabelaDashboard,
} from '../../../molecules/DashboardTable';
import type {
  MetricasKpi,
  ItemVendaRecente,
  PontoDadosGrafico,
} from '../../../../interfaces/dashboard.interface';
import './index.css';

export interface SalesSectionProps {
  kpi: MetricasKpi;
  vendasRecentes: ItemVendaRecente[];
  graficoVendas: Record<string, PontoDadosGrafico[]>;
  simboloMoeda?: string;
  className?: string;
}

const colunasVendas: ColunaTabelaDashboard[] = [
  { chave: 'nomeProduto', rotulo: 'PRODUTO', alinhamento: 'left' },
  { chave: 'quantidade', rotulo: 'QUANTIDADE', alinhamento: 'center' },
  {
    chave: 'preco',
    rotulo: 'PREÇO',
    alinhamento: 'right',
    render: (val) => {
      const num = Number(val || 0);
      return num.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    },
  },
  { chave: 'data', rotulo: 'DATA', alinhamento: 'right' },
];

const SalesSection: React.FC<SalesSectionProps> = ({
  kpi,
  vendasRecentes,
  graficoVendas,
  simboloMoeda = 'R$',
  className = '',
}) => {
  const [periodoSelecionado, setPeriodoSelecionado] = useState<string>('1M');

  // Suporte a chaves tanto 1S / 1M / 3M / 1A quanto 1W / 1Y
  const dadosGraficoAtual =
    graficoVendas[periodoSelecionado] ??
    (periodoSelecionado === '1S' ? graficoVendas['1W'] : undefined) ??
    (periodoSelecionado === '1A' ? graficoVendas['1Y'] : undefined) ??
    [];

  const faturamentoFormatado = kpi.faturamentoTotal.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  });

  return (
    <section className={`sales-section ${className}`.trim()}>
      <h2 className="dashboard-section-title">Vendas</h2>

      {/* 4 Cards de KPI */}
      <div className="sales-kpi-grid">
        <KpiCard
          titulo="Faturamento Total"
          valor={faturamentoFormatado}
          subtitulo="Indicador do mês"
        />
        <KpiCard
          titulo="Total de Produtos Vendidos"
          valor={kpi.totalProdutosVendidos.toLocaleString('pt-BR')}
          subtitulo="Indicador do mês"
        />
        <KpiCard
          titulo="Categoria Mais Vendida"
          valor={kpi.categoriaMaisVendida}
          subtitulo="Indicador do mês"
        />
        <KpiCard
          titulo="Produto Mais Vendido"
          valor={kpi.produtoMaisVendido}
          subtitulo="Indicador do mês"
        />
      </div>

      {/* Grid: Tabela de Vendas e Gráfico de Área */}
      <div className="sales-content-grid">
        <div className="dashboard-card sales-table-card shadow-sm">
          <DashboardTable
            colunas={colunasVendas}
            dados={vendasRecentes as unknown as Record<string, unknown>[]}
            tamanhoPaginaInicial={5}
            mensagemVazio="Nenhuma venda registrada no período."
          />
        </div>

        <div className="dashboard-card sales-chart-card shadow-sm">
          <AreaChart
            dados={dadosGraficoAtual}
            periodoSelecionado={periodoSelecionado}
            opcoesPeriodo={['1S', '1M', '3M', '1A']}
            onMudancaPeriodo={setPeriodoSelecionado}
            simboloMoeda={simboloMoeda}
          />
        </div>
      </div>
    </section>
  );
};

export const SecaoVendas = SalesSection;
export default SalesSection;

import React from 'react';
import Button from '../../../components/atoms/Button';
import type { PedidoComRelacionamentos } from '../../../interfaces/pedido.interface';
import './index.css';

export type PeriodoTipo = 'dia' | 'semana' | 'mes' | 'ano';

interface GraficoVendasProps {
  pedidos: PedidoComRelacionamentos[];
  periodoSelecionado: PeriodoTipo;
  onPeriodoChange: (periodo: PeriodoTipo) => void;
  onCriarPedido: () => void;
}

interface ItemRanking {
  nome: string;
  quantidade: number;
  total: number;
}

interface BarraGrafico {
  label: string;
  valor: number;
}

const GraficoVendas: React.FC<GraficoVendasProps> = ({
  pedidos,
  periodoSelecionado,
  onPeriodoChange,
  onCriarPedido,
}) => {
  // Filtra ou calcula métricas do período
  const pedidosConcluidosOuPendentes = pedidos.filter(
    (p) => p.status !== 'CANCELADO',
  );

  const totalFaturado = pedidosConcluidosOuPendentes.reduce(
    (acc, p) => acc + Number(p.valor_total || 0),
    0,
  );

  const totalUnidades = pedidosConcluidosOuPendentes.reduce((acc, p) => {
    const unidadesPedido =
      p.itens?.reduce((sub, it) => sub + Number(it.quantidade || 0), 0) ?? 0;
    return acc + unidadesPedido;
  }, 0);

  // Calcula ranking dos produtos mais vendidos
  const rankingMap = new Map<
    string,
    { nome: string; quantidade: number; total: number }
  >();

  for (const pedido of pedidosConcluidosOuPendentes) {
    if (pedido.itens) {
      for (const item of pedido.itens) {
        const nomeProd = item.produto?.nome ?? `Produto #${item.produto_id}`;
        const qtd = Number(item.quantidade || 0);
        const tot = Number(item.preco_unitario || 0) * qtd;

        const existente = rankingMap.get(nomeProd);
        if (existente) {
          existente.quantidade += qtd;
          existente.total += tot;
        } else {
          rankingMap.set(nomeProd, {
            nome: nomeProd,
            quantidade: qtd,
            total: tot,
          });
        }
      }
    }
  }

  const rankingProdutos: ItemRanking[] = Array.from(rankingMap.values())
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  const maiorTotalRanking =
    rankingProdutos.length > 0 ? rankingProdutos[0].total : 1;

  // Monta barras do gráfico com base no período selecionado
  const gerarBarras = (): BarraGrafico[] => {
    if (pedidosConcluidosOuPendentes.length === 0) {
      return [{ label: 'Sem dados', valor: 0 }];
    }

    if (periodoSelecionado === 'dia') {
      const diasMap: Record<string, number> = {};
      const diasLabels = [
        '08:00',
        '10:00',
        '12:00',
        '14:00',
        '16:00',
        '18:00',
        '20:00',
      ];
      diasLabels.forEach((h) => (diasMap[h] = 0));

      pedidosConcluidosOuPendentes.forEach((p) => {
        const d = new Date(p.data_pedido);
        const hora = d.getHours();
        const slot =
          diasLabels.find((_, idx) => hora <= 8 + idx * 2) ||
          diasLabels[diasLabels.length - 1];
        diasMap[slot] = (diasMap[slot] || 0) + Number(p.valor_total || 0);
      });

      return diasLabels.map((lbl) => ({
        label: lbl,
        valor: diasMap[lbl] || 0,
      }));
    }

    if (periodoSelecionado === 'semana') {
      const diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
      const mapaSemana: Record<string, number> = {};
      diasSemana.forEach((d) => (mapaSemana[d] = 0));

      pedidosConcluidosOuPendentes.forEach((p) => {
        const d = new Date(p.data_pedido);
        const dayIdx = (d.getDay() + 6) % 7; // Seg = 0
        const lbl = diasSemana[dayIdx];
        mapaSemana[lbl] = (mapaSemana[lbl] || 0) + Number(p.valor_total || 0);
      });

      return diasSemana.map((lbl) => ({
        label: lbl,
        valor: mapaSemana[lbl] || 0,
      }));
    }

    if (periodoSelecionado === 'mes') {
      const semanas = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'];
      const mapaMes: Record<string, number> = {};
      semanas.forEach((s) => (mapaMes[s] = 0));

      pedidosConcluidosOuPendentes.forEach((p) => {
        const d = new Date(p.data_pedido);
        const dia = d.getDate();
        const idx = Math.min(Math.floor((dia - 1) / 7), 3);
        const lbl = semanas[idx];
        mapaMes[lbl] = (mapaMes[lbl] || 0) + Number(p.valor_total || 0);
      });

      return semanas.map((lbl) => ({ label: lbl, valor: mapaMes[lbl] || 0 }));
    }

    // 'ano'
    const meses = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ];
    const mapaAno: Record<string, number> = {};
    meses.forEach((m) => (mapaAno[m] = 0));

    pedidosConcluidosOuPendentes.forEach((p) => {
      const d = new Date(p.data_pedido);
      const mIdx = d.getMonth();
      const lbl = meses[mIdx];
      mapaAno[lbl] = (mapaAno[lbl] || 0) + Number(p.valor_total || 0);
    });

    return meses.map((lbl) => ({ label: lbl, valor: mapaAno[lbl] || 0 }));
  };

  const barras = gerarBarras();
  const maiorValorBarra = Math.max(...barras.map((b) => b.valor), 1);

  return (
    <div className="grafico-vendas-card">
      <div className="grafico-vendas-header">
        <div>
          <h2 className="h4 fw-bold mb-1">Vendas</h2>
          <span className="text-muted small">
            Faturamento acumulado do período
          </span>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div
            className="periodo-btn-group"
            role="group"
            aria-label="Intervalo de tempo"
          >
            <button
              type="button"
              className={`periodo-btn ${periodoSelecionado === 'dia' ? 'active' : ''}`}
              onClick={() => onPeriodoChange('dia')}
            >
              Dia
            </button>
            <button
              type="button"
              className={`periodo-btn ${periodoSelecionado === 'semana' ? 'active' : ''}`}
              onClick={() => onPeriodoChange('semana')}
            >
              Semana
            </button>
            <button
              type="button"
              className={`periodo-btn ${periodoSelecionado === 'mes' ? 'active' : ''}`}
              onClick={() => onPeriodoChange('mes')}
            >
              Mês
            </button>
            <button
              type="button"
              className={`periodo-btn ${periodoSelecionado === 'ano' ? 'active' : ''}`}
              onClick={() => onPeriodoChange('ano')}
            >
              Ano
            </button>
          </div>

          <Button variant="primary" onClick={onCriarPedido}>
            Registrar Pedido
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <div className="faturamento-destaque">
          {totalFaturado.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </div>
        <div className="faturamento-subtexto">
          {totalUnidades.toLocaleString('pt-BR')} unidades vendidas
        </div>
      </div>

      {/* Gráfico de Barras */}
      <div
        className="chart-bars-container"
        aria-label="Gráfico de faturamento por período"
      >
        {barras.map((b, idx) => {
          const percent =
            maiorValorBarra > 0 ? (b.valor / maiorValorBarra) * 100 : 0;
          return (
            <div
              key={idx}
              className="chart-bar-column"
              title={`${b.label}: R$ ${b.valor.toFixed(2)}`}
            >
              <div
                className="chart-bar"
                style={{ height: `${Math.max(percent, 4)}%` }}
              />
              <span className="chart-bar-label">{b.label}</span>
            </div>
          );
        })}
      </div>

      {/* Ranking dos Produtos Mais Vendidos */}
      <div className="ranking-produtos-container">
        <h3 className="h6 fw-bold mb-3 text-secondary">
          Produtos mais vendidos
        </h3>
        {rankingProdutos.length === 0 ? (
          <p className="text-muted small fst-italic">
            Nenhuma venda registrada para compor o ranking.
          </p>
        ) : (
          rankingProdutos.map((item, idx) => {
            const pct = (item.total / maiorTotalRanking) * 100;
            return (
              <div key={idx} className="ranking-item">
                <div className="ranking-item-header">
                  <span className="ranking-item-title">
                    {item.nome}{' '}
                    <span className="ranking-item-un">
                      · {item.quantidade} un.
                    </span>
                  </span>
                  <span className="ranking-item-total">
                    {item.total.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                </div>
                <div className="ranking-progress-track">
                  <div
                    className="ranking-progress-bar"
                    style={{ width: `${Math.max(pct, 5)}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default GraficoVendas;

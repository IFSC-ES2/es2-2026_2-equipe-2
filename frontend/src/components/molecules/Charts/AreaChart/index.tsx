import React from 'react';
import type { PontoDadosGrafico } from '../../../../interfaces/dashboard.interface';
import './index.css';

export interface AreaChartProps {
  dados: PontoDadosGrafico[];
  periodoSelecionado?: string;
  opcoesPeriodo?: string[];
  onMudancaPeriodo?: (periodo: string) => void;
  simboloMoeda?: string;
  className?: string;
}

const AreaChart: React.FC<AreaChartProps> = ({
  dados,
  periodoSelecionado = '1M',
  opcoesPeriodo = ['1S', '1M', '3M', '1A'],
  onMudancaPeriodo,
  simboloMoeda = 'R$',
  className = '',
}) => {
  const larguraGrafico = 500;
  const alturaGrafico = 220;
  const espacamentoEsquerda = 55;
  const espacamentoDireita = 20;
  const espacamentoSuperior = 25;
  const espacamentoInferior = 35;

  const larguraInterna =
    larguraGrafico - espacamentoEsquerda - espacamentoDireita;
  const alturaInterna =
    alturaGrafico - espacamentoSuperior - espacamentoInferior;

  const valores = dados.map((d) => d.valor);
  const valorMaximo = Math.max(...valores, 100);

  // Arredonda para o teto mais limpo
  const passo = Math.ceil(valorMaximo / 5);
  const eixoYMaximo = passo * 5 || 100;
  const rotulosY = [5, 4, 3, 2, 1, 0].map((i) => i * passo);

  const formatarValorY = (val: number): string => {
    if (val === 0) return `${simboloMoeda}0`;
    if (val >= 1000000) return `${simboloMoeda}${(val / 1000000).toFixed(0)}M`;
    if (val >= 1000) return `${simboloMoeda}${(val / 1000).toFixed(0)}k`;
    return `${simboloMoeda}${val}`;
  };

  const pontos = dados.map((d, i) => {
    const x =
      espacamentoEsquerda +
      (dados.length > 1
        ? (i / (dados.length - 1)) * larguraInterna
        : larguraInterna / 2);
    const normalizadoY = (d.valor / eixoYMaximo) * alturaInterna;
    const y = espacamentoSuperior + alturaInterna - normalizadoY;
    return { x, y, rotulo: d.rotulo, valor: d.valor };
  });

  const caminhoLinha =
    pontos.length > 0
      ? `M ${pontos[0].x} ${pontos[0].y} ` +
        pontos
          .slice(1)
          .map((p) => `L ${p.x} ${p.y}`)
          .join(' ')
      : '';

  const caminhoArea =
    pontos.length > 0
      ? `${caminhoLinha} L ${pontos[pontos.length - 1].x} ${
          espacamentoSuperior + alturaInterna
        } L ${pontos[0].x} ${espacamentoSuperior + alturaInterna} Z`
      : '';

  return (
    <div className={`area-chart-container ${className}`.trim()}>
      <div className="area-chart-header">
        <div
          className="timeframe-selector"
          role="tablist"
          aria-label="Intervalo de tempo"
        >
          {opcoesPeriodo.map((opc) => (
            <button
              key={opc}
              type="button"
              className={`timeframe-btn ${periodoSelecionado === opc ? 'active' : ''}`}
              onClick={() => onMudancaPeriodo?.(opc)}
              role="tab"
              aria-selected={periodoSelecionado === opc}
            >
              {opc}
            </button>
          ))}
        </div>
      </div>

      <div className="area-chart-svg-wrap">
        <svg
          viewBox={`0 0 ${larguraGrafico} ${alturaGrafico}`}
          className="area-chart-svg"
          preserveAspectRatio="none"
          role="img"
          aria-label="Gráfico de área de vendas"
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#12315c" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#2f9bd6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Linhas de Grade e Eixo Y */}
          {rotulosY.map((val, idx) => {
            const posicaoY =
              espacamentoSuperior +
              (idx / (rotulosY.length - 1)) * alturaInterna;
            return (
              <g key={`y-${val}-${idx}`} className="chart-grid-line">
                <line
                  x1={espacamentoEsquerda}
                  y1={posicaoY}
                  x2={larguraGrafico - espacamentoDireita}
                  y2={posicaoY}
                  stroke="#e2edf5"
                  strokeWidth="1"
                />
                <text
                  x={espacamentoEsquerda - 8}
                  y={posicaoY + 4}
                  textAnchor="end"
                  className="chart-axis-text"
                >
                  {formatarValorY(val)}
                </text>
              </g>
            );
          })}

          {/* Área preenchida */}
          {caminhoArea && (
            <path
              d={caminhoArea}
              fill="url(#areaGradient)"
              className="chart-area-fill"
            />
          )}

          {/* Linha de topo */}
          {caminhoLinha && (
            <path
              d={caminhoLinha}
              fill="none"
              stroke="#12315c"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="chart-stroke-line"
            />
          )}

          {/* Pontos nos vértices */}
          {pontos.map((p, idx) => (
            <circle
              key={`dot-${idx}`}
              cx={p.x}
              cy={p.y}
              r="3.5"
              fill="#12315c"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          ))}

          {/* Rótulos do Eixo X */}
          {pontos.map((p, idx) => (
            <text
              key={`x-${idx}`}
              x={p.x}
              y={alturaGrafico - 10}
              textAnchor="middle"
              className="chart-axis-text"
            >
              {p.rotulo}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default AreaChart;

import React from 'react';
import type { ItemDistribuicaoCategoria } from '../../../../interfaces/dashboard.interface';
import './index.css';

export interface DonutChartProps {
  dados: ItemDistribuicaoCategoria[];
  rotuloCentral?: string;
  valorCentral?: string | number;
  className?: string;
}

const DonutChart: React.FC<DonutChartProps> = ({
  dados,
  rotuloCentral,
  valorCentral,
  className = '',
}) => {
  const tamanho = 180;
  const larguraTraco = 24;
  const raio = (tamanho - larguraTraco) / 2;
  const centro = tamanho / 2;
  const circunferencia = 2 * Math.PI * raio;

  const total = dados.reduce((acc, atual) => acc + atual.quantidade, 0) || 1;

  const segmentos = dados.map((item, idx) => {
    const fracao = item.quantidade / total;
    const fracaoPrefixo = dados
      .slice(0, idx)
      .reduce((soma, ant) => soma + ant.quantidade / total, 0);
    const strokeDasharray = `${fracao * circunferencia} ${circunferencia}`;
    const strokeDashoffset = -fracaoPrefixo * circunferencia;

    return {
      ...item,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <div className={`donut-chart-card ${className}`.trim()}>
      <div className="donut-chart-svg-wrap">
        <svg
          width={tamanho}
          height={tamanho}
          viewBox={`0 0 ${tamanho} ${tamanho}`}
          className="donut-chart-svg"
          role="img"
          aria-label="Gráfico de distribuição por categoria"
        >
          {/* Fundo do círculo se vazio */}
          {dados.length === 0 && (
            <circle
              cx={centro}
              cy={centro}
              r={raio}
              fill="none"
              stroke="#e2edf5"
              strokeWidth={larguraTraco}
            />
          )}

          {/* Segmentos coloridos */}
          <g transform={`rotate(-90 ${centro} ${centro})`}>
            {segmentos.map((seg, idx) => (
              <circle
                key={`donut-seg-${idx}`}
                cx={centro}
                cy={centro}
                r={raio}
                fill="none"
                stroke={seg.cor}
                strokeWidth={larguraTraco}
                strokeDasharray={seg.strokeDasharray}
                strokeDashoffset={seg.strokeDashoffset}
                strokeLinecap="round"
                className="donut-segment"
              />
            ))}
          </g>

          {/* Texto central opcional */}
          {valorCentral !== undefined && (
            <g className="donut-center-text">
              {rotuloCentral && (
                <text
                  x={centro}
                  y={centro - 10}
                  textAnchor="middle"
                  className="donut-center-label"
                >
                  {rotuloCentral}
                </text>
              )}
              <text
                x={centro}
                y={rotuloCentral ? centro + 14 : centro + 6}
                textAnchor="middle"
                className="donut-center-value"
              >
                {valorCentral}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Legenda / Tabela da distribuição */}
      <div className="donut-legend-wrap">
        <div className="donut-legend-header">
          <span>Categoria</span>
          <span>%</span>
        </div>
        <div className="donut-legend-list">
          {dados.length === 0 ? (
            <div className="text-center text-muted small py-2">
              Nenhuma categoria registrada
            </div>
          ) : (
            dados.map((item, idx) => (
              <div key={`legend-${idx}`} className="donut-legend-item">
                <div className="donut-legend-name-group">
                  <span
                    className="donut-legend-dot"
                    style={{ backgroundColor: item.cor }}
                  />
                  <span
                    className="donut-legend-label"
                    style={{ color: item.cor }}
                  >
                    {item.rotulo}
                  </span>
                </div>
                <span className="donut-legend-percent">
                  {item.porcentagem}%
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DonutChart;

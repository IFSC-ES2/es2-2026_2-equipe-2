import React from 'react';
import './index.css';

export interface KpiCardProps {
  titulo?: string;
  valor?: string | number;
  subtitulo?: string;
  className?: string;

  // Retrocompatibilidade
  title?: string;
  value?: string | number;
  subtitle?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({
  titulo,
  valor,
  subtitulo,
  title,
  value,
  subtitle,
  className = '',
}) => {
  const tituloFinal = titulo ?? title ?? '';
  const valorFinal = valor ?? value ?? '';
  const subtituloFinal = subtitulo ?? subtitle ?? 'Indicador do mês';

  return (
    <div className={`kpi-card shadow-sm ${className}`.trim()}>
      <span className="kpi-card-titulo kpi-card-title">{tituloFinal}</span>
      <span className="kpi-card-valor kpi-card-value">{valorFinal}</span>
      {subtituloFinal && (
        <span className="kpi-card-subtitulo kpi-card-subtitle">
          {subtituloFinal}
        </span>
      )}
    </div>
  );
};

export default KpiCard;

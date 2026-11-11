import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import KpiCard from './index';

describe('KpiCard Atom', () => {
  it('deve renderizar o título e o valor corretamente', () => {
    render(<KpiCard titulo="Faturamento Total" valor="R$ 100.000" />);
    expect(screen.getByText('Faturamento Total')).toBeDefined();
    expect(screen.getByText('R$ 100.000')).toBeDefined();
  });

  it('deve renderizar o subtítulo padrão e personalizado', () => {
    const { rerender } = render(<KpiCard titulo="Produtos" valor="3400" />);
    expect(screen.getByText('Indicador do mês')).toBeDefined();

    rerender(
      <KpiCard
        titulo="Produtos"
        valor="3400"
        subtitulo="Indicador personalizado"
      />,
    );
    expect(screen.getByText('Indicador personalizado')).toBeDefined();
  });

  it('deve manter suporte a props legadas em inglês', () => {
    render(<KpiCard title="Total Earnings" value="R$ 50.000" />);
    expect(screen.getByText('Total Earnings')).toBeDefined();
    expect(screen.getByText('R$ 50.000')).toBeDefined();
  });
});

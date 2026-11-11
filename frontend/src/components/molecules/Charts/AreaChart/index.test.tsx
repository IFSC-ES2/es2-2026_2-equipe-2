import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AreaChart from './index';

describe('AreaChart Molecule', () => {
  const mockDados = [
    { rotulo: '18', valor: 20000 },
    { rotulo: '20', valor: 45000 },
    { rotulo: '22', valor: 70000 },
    { rotulo: '24', valor: 50000 },
    { rotulo: '26', valor: 30000 },
    { rotulo: '28', valor: 60000 },
    { rotulo: '30', valor: 75000 },
  ];

  it('deve renderizar o seletor de período e os botões em português', () => {
    const handlePeriodoChange = vi.fn();
    render(
      <AreaChart
        dados={mockDados}
        periodoSelecionado="1M"
        onMudancaPeriodo={handlePeriodoChange}
      />,
    );

    const btn1S = screen.getByRole('tab', { name: '1S' });
    const btn1M = screen.getByRole('tab', { name: '1M' });
    expect(btn1S).toBeDefined();
    expect(btn1M).toBeDefined();

    fireEvent.click(btn1S);
    expect(handlePeriodoChange).toHaveBeenCalledWith('1S');
  });

  it('deve renderizar o SVG com elementos gráficos e rótulos de data', () => {
    render(<AreaChart dados={mockDados} />);
    expect(
      screen.getByRole('img', { name: /Gráfico de área de vendas/i }),
    ).toBeDefined();
    expect(screen.getByText('18')).toBeDefined();
    expect(screen.getByText('30')).toBeDefined();
  });
});

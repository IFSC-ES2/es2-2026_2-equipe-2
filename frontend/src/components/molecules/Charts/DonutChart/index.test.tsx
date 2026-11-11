import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DonutChart from './index';

describe('DonutChart Molecule', () => {
  const mockDados = [
    { rotulo: 'Eletrônicos', quantidade: 60, porcentagem: 60, cor: '#f97316' },
    { rotulo: 'Roupas', quantidade: 25, porcentagem: 25, cor: '#2f9bd6' },
    { rotulo: 'Cosméticos', quantidade: 15, porcentagem: 15, cor: '#f87171' },
  ];

  it('deve renderizar o cabeçalho Categoria e as porcentagens', () => {
    render(<DonutChart dados={mockDados} />);
    expect(screen.getByText('Categoria')).toBeDefined();
    expect(screen.getByText('Eletrônicos')).toBeDefined();
    expect(screen.getByText('60%')).toBeDefined();
    expect(screen.getByText('Roupas')).toBeDefined();
    expect(screen.getByText('25%')).toBeDefined();
  });

  it('deve renderizar texto central se fornecido', () => {
    render(
      <DonutChart dados={mockDados} rotuloCentral="Total" valorCentral="100" />,
    );
    expect(screen.getByText('Total')).toBeDefined();
    expect(screen.getByText('100')).toBeDefined();
  });
});

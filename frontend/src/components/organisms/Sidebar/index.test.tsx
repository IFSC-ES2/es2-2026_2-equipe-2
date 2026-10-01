import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '.';

describe('Organism Sidebar', () => {
  it('deve renderizar o título da marca AURA por padrão', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    const brand = screen.getByRole('heading', { level: 1, name: 'AURA' });
    expect(brand).toBeDefined();
  });

  it('deve renderizar todos os itens de navegação padrão', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /dashboard/i })).toBeDefined();
    expect(screen.getByRole('link', { name: /vendas/i })).toBeDefined();
    expect(screen.getByRole('link', { name: /finanças/i })).toBeDefined();
    expect(screen.getByRole('link', { name: /clientes/i })).toBeDefined();
    expect(screen.getByRole('link', { name: /estoque/i })).toBeDefined();
  });

  it('deve destacar a rota ativa com a classe active', () => {
    render(
      <MemoryRouter initialEntries={['/estoque']}>
        <Sidebar />
      </MemoryRouter>,
    );

    const estoqueLink = screen.getByRole('link', { name: /estoque/i });
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });

    expect(estoqueLink.className).toContain('active');
    expect(dashboardLink.className).not.toContain('active');
  });

  it('deve permitir customizar a marca e os itens de navegação', () => {
    const customItems = [
      {
        label: 'Relatórios',
        to: '/relatorios',
        icon: 'bi-file-earmark-bar-graph',
      },
    ];

    render(
      <MemoryRouter>
        <Sidebar brandName="SISTEMA X" navItems={customItems} />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'SISTEMA X' }),
    ).toBeDefined();
    expect(screen.getByRole('link', { name: /relatórios/i })).toBeDefined();
    expect(screen.queryByRole('link', { name: /estoque/i })).toBeNull();
  });
});

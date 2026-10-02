import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BaseLayout from '.';

describe('Template BaseLayout', () => {
  it('deve renderizar a Sidebar, o Header com o título e o conteúdo filho (children)', () => {
    render(
      <MemoryRouter>
        <BaseLayout title="Estoque">
          <div data-testid="conteudo-teste">Conteúdo da Página de Estoque</div>
        </BaseLayout>
      </MemoryRouter>,
    );

    // Sidebar
    expect(
      screen.getByRole('heading', { level: 1, name: 'AURA' }),
    ).toBeDefined();
    expect(screen.getByRole('link', { name: /estoque/i })).toBeDefined();

    // Header
    expect(
      screen.getByRole('heading', { level: 2, name: 'Estoque' }),
    ).toBeDefined();

    // Children
    expect(screen.getByTestId('conteudo-teste')).toBeDefined();
    expect(screen.getByText('Conteúdo da Página de Estoque')).toBeDefined();
  });
});

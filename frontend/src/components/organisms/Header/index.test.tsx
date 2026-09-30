import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Header from '.';
import * as usuarioService from '../../../services/usuario.service';

vi.mock('../../../services/usuario.service', () => ({
  getUsuarioAtual: vi.fn(),
}));

describe('Organism Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar o título da página fornecido via props', async () => {
    vi.mocked(usuarioService.getUsuarioAtual).mockResolvedValueOnce({
      id: 1,
      nome: 'Usuario',
      email: 'usuario@gmail.com',
    });

    render(<Header title="Estoque" />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Estoque' }),
    ).toBeDefined();

    await waitFor(() => {
      expect(screen.getByText('Usuario')).toBeDefined();
    });
  });

  it('deve carregar e exibir os dados do usuário a partir do serviço de usuários', async () => {
    vi.mocked(usuarioService.getUsuarioAtual).mockResolvedValueOnce({
      id: 1,
      nome: 'Carlos Souza',
      email: 'carlos@empresa.com',
    });

    render(<Header title="Estoque" />);

    await waitFor(() => {
      expect(screen.getByText('Carlos Souza')).toBeDefined();
      expect(screen.getByText('carlos@empresa.com')).toBeDefined();
    });
  });
});

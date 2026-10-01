import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Cliente from '.';
import * as clienteService from '../../services/cliente.service';

vi.mock('../../services/cliente.service', () => ({
  getClientes: vi.fn(),
  createCliente: vi.fn(),
  updateCliente: vi.fn(),
  deleteCliente: vi.fn(),
}));

const renderCliente = () =>
  render(
    <MemoryRouter>
      <Cliente />
    </MemoryRouter>,
  );

describe('Page Cliente', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar o estado de carregamento inicialmente', () => {
    vi.mocked(clienteService.getClientes).mockImplementationOnce(
      () => new Promise(() => {}),
    );

    renderCliente();

    expect(screen.getByText('Listagem dos Clientes')).toBeDefined();
    expect(screen.getByText('Carregando...')).toBeDefined();
  });

  it('deve renderizar mensagem de erro quando a chamada da API falhar', async () => {
    vi.mocked(clienteService.getClientes).mockRejectedValueOnce(
      new Error('Erro ao carregar clientes'),
    );

    renderCliente();

    await waitFor(() => {
      expect(screen.getByText('Erro ao carregar clientes')).toBeDefined();
    });
  });

  it('deve renderizar a tabela com os clientes quando a chamada for bem sucedida', async () => {
    vi.mocked(clienteService.getClientes).mockResolvedValueOnce({
      columns: [
        { key: 'nome', label: 'Nome' },
        { key: 'email', label: 'E-mail' },
      ],
      data: [{ id: 1, nome: 'João da Silva', email: 'joao@email.com' }],
    });

    renderCliente();

    await waitFor(() => {
      expect(screen.getByText('João da Silva')).toBeDefined();
      expect(screen.getByText('joao@email.com')).toBeDefined();
    });
  });

  it('deve abrir o modal de cadastro ao clicar em Novo Cliente e recarregar os dados ao salvar', async () => {
    vi.mocked(clienteService.getClientes).mockResolvedValue({
      columns: [{ key: 'id', label: 'ID' }],
      data: [{ id: 1 }],
    });

    renderCliente();

    await waitFor(() => {
      expect(screen.getByText('Novo Cliente')).toBeDefined();
    });

    expect(screen.queryByLabelText(/Nome \/ Razão Social \*/i)).toBeNull();

    fireEvent.click(screen.getByText('Novo Cliente'));

    await waitFor(() => {
      expect(screen.getByLabelText(/Nome \/ Razão Social \*/i)).toBeDefined();
      expect(screen.getByLabelText(/E-mail \*/i)).toBeDefined();
      expect(screen.getByText('Salvar Cliente')).toBeDefined();
    });

    fireEvent.change(screen.getByLabelText(/Nome \/ Razão Social \*/i), {
      target: { value: 'Maria Oliveira' },
    });
    fireEvent.change(screen.getByLabelText(/E-mail \*/i), {
      target: { value: 'maria@email.com' },
    });

    vi.mocked(clienteService.createCliente).mockResolvedValueOnce({
      id: 2,
      nome: 'Maria Oliveira',
      email: 'maria@email.com',
      telefone: null,
      documento: null,
      endereco: null,
      criado_em: new Date().toISOString(),
    });

    fireEvent.click(screen.getByText('Salvar Cliente'));

    await waitFor(() => {
      expect(screen.queryByLabelText(/Nome \/ Razão Social \*/i)).toBeNull();
    });

    expect(clienteService.getClientes).toHaveBeenCalledTimes(2);
  });
});

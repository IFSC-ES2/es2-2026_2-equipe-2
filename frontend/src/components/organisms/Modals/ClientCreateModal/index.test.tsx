import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ClientCreateModal from '.';
import type { Cliente } from '../../../../interfaces/cliente.interface';

describe('Organism ClientCreateModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('não deve renderizar quando isOpen for falso', () => {
    render(
      <ClientCreateModal
        isOpen={false}
        onClose={vi.fn()}
        onSuccess={vi.fn()}
      />,
    );

    expect(screen.queryByText('Novo Cliente')).toBeNull();
  });

  it('deve renderizar o título Novo Cliente e o formulário quando isOpen for verdadeiro', () => {
    render(
      <ClientCreateModal isOpen={true} onClose={vi.fn()} onSuccess={vi.fn()} />,
    );

    expect(screen.getByText('Novo Cliente')).toBeDefined();
    expect(screen.getByLabelText(/Nome \/ Razão Social \*/i)).toBeDefined();
    expect(screen.getByLabelText(/E-mail \*/i)).toBeDefined();
    expect(screen.getByText('Salvar Cliente')).toBeDefined();
    expect(screen.getByText('Cancelar')).toBeDefined();
  });

  it('deve renderizar o título Editar Cliente quando o cliente for fornecido', () => {
    const mockCliente: Cliente = {
      id: 5,
      nome: 'Cliente Existente',
      email: 'existente@cliente.com',
      telefone: null,
      documento: null,
      endereco: null,
      criado_em: '2026-10-01T00:00:00Z',
    };

    render(
      <ClientCreateModal
        isOpen={true}
        onClose={vi.fn()}
        onSuccess={vi.fn()}
        cliente={mockCliente}
      />,
    );

    expect(screen.getByText('Editar Cliente')).toBeDefined();
    expect(
      (screen.getByLabelText(/Nome \/ Razão Social \*/i) as HTMLInputElement)
        .value,
    ).toBe('Cliente Existente');
    expect(screen.getByText('Salvar Alterações')).toBeDefined();
  });

  it('deve chamar onClose ao clicar no botão Cancelar', () => {
    const onClose = vi.fn();
    render(
      <ClientCreateModal isOpen={true} onClose={onClose} onSuccess={vi.fn()} />,
    );

    fireEvent.click(screen.getByText('Cancelar'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onSuccess e onClose quando o formulário for submetido com sucesso', async () => {
    const saveService = vi.fn().mockResolvedValueOnce({ id: 1 });
    const onSuccess = vi.fn();
    const onClose = vi.fn();

    render(
      <ClientCreateModal
        isOpen={true}
        onClose={onClose}
        onSuccess={onSuccess}
        saveService={saveService}
      />,
    );

    fireEvent.change(screen.getByLabelText(/Nome \/ Razão Social \*/i), {
      target: { value: 'Cliente Teste' },
    });
    fireEvent.change(screen.getByLabelText(/E-mail \*/i), {
      target: { value: 'teste@email.com' },
    });

    fireEvent.click(screen.getByText('Salvar Cliente'));

    await waitFor(() => {
      expect(saveService).toHaveBeenCalledTimes(1);
    });

    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

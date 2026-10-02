import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import FormCreateClient from '.';
import type { Cliente } from '../../../../interfaces/cliente.interface';
import * as clienteService from '../../../../services/cliente.service';

vi.mock('../../../../services/cliente.service', () => ({
  createCliente: vi.fn(),
  updateCliente: vi.fn(),
}));

describe('Organism FormCreateClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar os campos do formulário e botões no modo criação', () => {
    render(<FormCreateClient onCancel={vi.fn()} />);

    expect(screen.getByLabelText(/Nome \/ Razão Social \*/i)).toBeDefined();
    expect(screen.getByLabelText(/Documento/i)).toBeDefined();
    expect(screen.getByLabelText(/E-mail \*/i)).toBeDefined();
    expect(screen.getByLabelText(/Telefone/i)).toBeDefined();
    expect(screen.getByLabelText(/Endereço/i)).toBeDefined();
    expect(screen.getByText('Salvar Cliente')).toBeDefined();
    expect(screen.getByText('Cancelar')).toBeDefined();
  });

  it('deve preencher os campos com os dados do cliente e exibir botão Salvar Alterações no modo edição', () => {
    const mockCliente: Cliente = {
      id: 1,
      nome: 'Empresa Teste',
      email: 'contato@empresa.com',
      telefone: '1199999999',
      documento: '12345678000199',
      endereco: 'Rua Central, 50',
      criado_em: '2026-10-01T00:00:00Z',
    };

    render(<FormCreateClient cliente={mockCliente} onCancel={vi.fn()} />);

    expect(
      (screen.getByLabelText(/Nome \/ Razão Social \*/i) as HTMLInputElement)
        .value,
    ).toBe('Empresa Teste');
    expect(
      (screen.getByLabelText(/E-mail \*/i) as HTMLInputElement).value,
    ).toBe('contato@empresa.com');
    expect((screen.getByLabelText(/Telefone/i) as HTMLInputElement).value).toBe(
      '1199999999',
    );
    expect(
      (screen.getByLabelText(/Documento/i) as HTMLInputElement).value,
    ).toBe('12345678000199');
    expect((screen.getByLabelText(/Endereço/i) as HTMLInputElement).value).toBe(
      'Rua Central, 50',
    );
    expect(screen.getByText('Salvar Alterações')).toBeDefined();
  });

  it('deve exibir mensagem de erro se campos obrigatórios não forem preenchidos', async () => {
    const saveService = vi.fn();
    render(<FormCreateClient saveService={saveService} />);

    fireEvent.click(screen.getByText('Salvar Cliente'));

    await waitFor(() => {
      expect(
        screen.getByText('Preencha os campos obrigatórios: Nome e E-mail.'),
      ).toBeDefined();
    });

    expect(saveService).not.toHaveBeenCalled();
  });

  it('deve chamar o saveService com o payload correto e disparar onSuccess no cadastro', async () => {
    const saveService = vi.fn().mockResolvedValueOnce({ id: 1 });
    const onSuccess = vi.fn();

    render(
      <FormCreateClient saveService={saveService} onSuccess={onSuccess} />,
    );

    fireEvent.change(screen.getByLabelText(/Nome \/ Razão Social \*/i), {
      target: { value: 'Novo Cliente' },
    });
    fireEvent.change(screen.getByLabelText(/E-mail \*/i), {
      target: { value: 'novo@cliente.com' },
    });
    fireEvent.change(screen.getByLabelText(/Telefone/i), {
      target: { value: '1188888888' },
    });

    fireEvent.click(screen.getByText('Salvar Cliente'));

    await waitFor(() => {
      expect(saveService).toHaveBeenCalledWith({
        nome: 'Novo Cliente',
        email: 'novo@cliente.com',
        telefone: '1188888888',
        documento: null,
        endereco: null,
      });
    });

    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('deve chamar updateCliente com o payload correto no modo edição', async () => {
    const mockCliente: Cliente = {
      id: 10,
      nome: 'Cliente Antigo',
      email: 'antigo@cliente.com',
      telefone: null,
      documento: null,
      endereco: null,
      criado_em: '2026-10-01T00:00:00Z',
    };
    const onSuccess = vi.fn();

    vi.mocked(clienteService.updateCliente).mockResolvedValueOnce({
      ...mockCliente,
      nome: 'Cliente Atualizado',
    });

    render(<FormCreateClient cliente={mockCliente} onSuccess={onSuccess} />);

    fireEvent.change(screen.getByLabelText(/Nome \/ Razão Social \*/i), {
      target: { value: 'Cliente Atualizado' },
    });

    fireEvent.click(screen.getByText('Salvar Alterações'));

    await waitFor(() => {
      expect(clienteService.updateCliente).toHaveBeenCalledWith(10, {
        nome: 'Cliente Atualizado',
        email: 'antigo@cliente.com',
        telefone: null,
        documento: null,
        endereco: null,
      });
    });

    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('deve acionar onCancel ao clicar no botão Cancelar', () => {
    const onCancel = vi.fn();
    render(<FormCreateClient onCancel={onCancel} />);

    fireEvent.click(screen.getByText('Cancelar'));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('deve exibir mensagem de erro quando saveService falhar', async () => {
    const saveService = vi
      .fn()
      .mockRejectedValueOnce(new Error('E-mail já cadastrado'));
    const onSuccess = vi.fn();

    render(
      <FormCreateClient saveService={saveService} onSuccess={onSuccess} />,
    );

    fireEvent.change(screen.getByLabelText(/Nome \/ Razão Social \*/i), {
      target: { value: 'Cliente Duplicado' },
    });
    fireEvent.change(screen.getByLabelText(/E-mail \*/i), {
      target: { value: 'duplicado@cliente.com' },
    });

    fireEvent.click(screen.getByText('Salvar Cliente'));

    await waitFor(() => {
      expect(screen.getByText('E-mail já cadastrado')).toBeDefined();
    });

    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('deve exibir mensagem de erro se o documento contiver caracteres inválidos', async () => {
    const saveService = vi.fn();
    render(<FormCreateClient saveService={saveService} />);

    fireEvent.change(screen.getByLabelText(/Nome \/ Razão Social \*/i), {
      target: { value: 'Cliente Teste' },
    });
    fireEvent.change(screen.getByLabelText(/E-mail \*/i), {
      target: { value: 'teste@cliente.com' },
    });
    fireEvent.change(screen.getByLabelText(/Documento/i), {
      target: { value: '123.456.789-00abc' },
    });

    fireEvent.click(screen.getByText('Salvar Cliente'));

    await waitFor(() => {
      expect(
        screen.getByText(
          'Documento inválido. Utilize apenas números e símbolos de CPF/CNPJ.',
        ),
      ).toBeDefined();
    });

    expect(saveService).not.toHaveBeenCalled();
  });

  it('deve exibir mensagem de erro se o telefone contiver caracteres inválidos', async () => {
    const saveService = vi.fn();
    render(<FormCreateClient saveService={saveService} />);

    fireEvent.change(screen.getByLabelText(/Nome \/ Razão Social \*/i), {
      target: { value: 'Cliente Teste' },
    });
    fireEvent.change(screen.getByLabelText(/E-mail \*/i), {
      target: { value: 'teste@cliente.com' },
    });
    fireEvent.change(screen.getByLabelText(/Telefone/i), {
      target: { value: '(11) 98888-1111ramal' },
    });

    fireEvent.click(screen.getByText('Salvar Cliente'));

    await waitFor(() => {
      expect(
        screen.getByText(
          'Telefone inválido. Utilize apenas números e símbolos.',
        ),
      ).toBeDefined();
    });

    expect(saveService).not.toHaveBeenCalled();
  });

  it('deve aceitar documento e telefone com formatação válida de CPF/CNPJ e telefone', async () => {
    const saveService = vi.fn().mockResolvedValueOnce({ id: 20 });
    const onSuccess = vi.fn();

    render(
      <FormCreateClient saveService={saveService} onSuccess={onSuccess} />,
    );

    fireEvent.change(screen.getByLabelText(/Nome \/ Razão Social \*/i), {
      target: { value: 'Empresa Alpha' },
    });
    fireEvent.change(screen.getByLabelText(/E-mail \*/i), {
      target: { value: 'alpha@empresa.com' },
    });
    fireEvent.change(screen.getByLabelText(/Documento/i), {
      target: { value: '12.345.678/0001-90' },
    });
    fireEvent.change(screen.getByLabelText(/Telefone/i), {
      target: { value: '+55 (11) 98888-1111' },
    });

    fireEvent.click(screen.getByText('Salvar Cliente'));

    await waitFor(() => {
      expect(saveService).toHaveBeenCalledWith({
        nome: 'Empresa Alpha',
        email: 'alpha@empresa.com',
        documento: '12.345.678/0001-90',
        telefone: '+55 (11) 98888-1111',
        endereco: null,
      });
    });

    expect(onSuccess).toHaveBeenCalledTimes(1);
  });
});

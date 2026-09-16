import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ActionButtons from '.';

interface MockButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  'data-testid'?: string;
}

// Mock puro e estrito do filho (Átomo Button) garantindo que este seja um teste *Puramente Unitário* da Molécula
vi.mock('../atoms/Button', () => {
  return {
    default: ({
      children,
      onClick,
      'data-testid': testId,
    }: MockButtonProps) => (
      <button data-testid={testId || 'mock-button'} onClick={onClick}>
        {children}
      </button>
    ),
  };
});

describe('Molécula ActionButtons', () => {
  it('deve renderizar os botões Editar e Excluir corretamente', () => {
    render(<ActionButtons />);
    expect(screen.getByText('Editar')).toBeDefined();
    expect(screen.getByText('Excluir')).toBeDefined();
  });

  it('deve disparar a função onEdit quando o botão Editar for clicado', () => {
    const onEditMock = vi.fn();
    render(<ActionButtons onEdit={onEditMock} />);

    const editButton = screen.getByText('Editar');
    fireEvent.click(editButton);

    expect(onEditMock).toHaveBeenCalledTimes(1);
  });

  it('deve disparar a função onDelete quando o botão Excluir for clicado', () => {
    const onDeleteMock = vi.fn();
    render(<ActionButtons onDelete={onDeleteMock} />);

    const deleteButton = screen.getByText('Excluir');
    fireEvent.click(deleteButton);

    expect(onDeleteMock).toHaveBeenCalledTimes(1);
  });
});

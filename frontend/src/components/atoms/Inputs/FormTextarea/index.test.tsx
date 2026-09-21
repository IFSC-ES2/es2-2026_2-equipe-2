import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import FormTextarea from '.';

describe('Atom FormTextarea', () => {
  it('deve renderizar o label informado', () => {
    render(
      <FormTextarea
        label="Descrição"
        name="descricao"
        value="Texto teste"
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByText('Descrição')).toBeDefined();
  });

  it('deve associar o label ao textarea pelo atributo id', () => {
    render(
      <FormTextarea
        label="Descrição"
        name="descricao"
        value="Texto teste"
        onChange={vi.fn()}
      />,
    );

    const textarea = screen.getByLabelText('Descrição') as HTMLTextAreaElement;
    expect(textarea).toBeDefined();
    expect(textarea.id).toBe('descricao');
  });

  it('deve disparar o evento onChange ao digitar', () => {
    const handleChange = vi.fn();
    render(
      <FormTextarea
        label="Descrição"
        name="descricao"
        value=""
        onChange={handleChange}
      />,
    );

    const textarea = screen.getByLabelText('Descrição');
    fireEvent.change(textarea, { target: { value: 'Nova descrição' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('deve aplicar atributos adicionais como rows e placeholder', () => {
    render(
      <FormTextarea
        label="Descrição"
        name="descricao"
        placeholder="Digite os detalhes"
        rows={5}
        value=""
        onChange={vi.fn()}
      />,
    );

    const textarea = screen.getByPlaceholderText('Digite os detalhes') as HTMLTextAreaElement;
    expect(textarea.rows).toBe(5);
  });
});
